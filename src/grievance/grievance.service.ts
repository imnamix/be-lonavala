import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrievanceEntity } from './entities/grievance.entity';
import { CitizenEntity } from '../citizen/entities/citizen.entity';
import { CreateGrievanceDto } from './dto/create-grievance.dto';
import { UpdateGrievanceStatusDto } from './dto/update-grievance-status.dto';
import { GrievanceStatus } from '../global/system.enums';

@Injectable()
export class GrievanceService {
  constructor(
    @InjectRepository(GrievanceEntity)
    private readonly grievanceRepo: Repository<GrievanceEntity>,
    @InjectRepository(CitizenEntity)
    private readonly citizenRepo: Repository<CitizenEntity>,
  ) {}

  // ─────────────────────────────────────────────────────────────────────────
  // Citizen-facing
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Create a new grievance for a citizen.
   * Links to existing citizen, or creates citizen record by phone if unauthenticated.
   * Auto-generates a unique ticket number in the format GRV-YYYY-XXXXXX.
   */
  async create(citizenId: number | undefined, dto: CreateGrievanceDto) {
    try {
      let resolvedCitizenId = citizenId || null;

      // If no JWT citizenId was provided, look up or create citizen by phone
      if (!resolvedCitizenId && dto.citizenMobile) {
        const cleanPhone = dto.citizenMobile.replace(/\D/g, '').slice(-10);
        if (cleanPhone) {
          const formattedPhone = `+91${cleanPhone}`;
          let citizen = await this.citizenRepo.findOne({
            where: [{ phone: formattedPhone }, { phone: cleanPhone }],
          });

          if (!citizen) {
            citizen = this.citizenRepo.create({
              firebaseUid: `citizen_${cleanPhone}_${Date.now()}`,
              phone: formattedPhone,
              name: dto.citizenName || null,
              email: dto.citizenEmail || null,
              address: dto.address || null,
              isActive: true,
            });
            citizen = await this.citizenRepo.save(citizen);
          } else {
            let updated = false;
            if (dto.citizenName && !citizen.name) {
              citizen.name = dto.citizenName;
              updated = true;
            }
            if (dto.citizenEmail && !citizen.email) {
              citizen.email = dto.citizenEmail;
              updated = true;
            }
            if (dto.address && !citizen.address) {
              citizen.address = dto.address;
              updated = true;
            }
            if (updated) {
              citizen = await this.citizenRepo.save(citizen);
            }
          }

          resolvedCitizenId = citizen.id;
        }
      }

      const ticketNumber = await this.generateTicketNumber();

      const grievance = this.grievanceRepo.create({
        ...dto,
        citizenId: resolvedCitizenId,
        ticketNumber,
        status: GrievanceStatus.PENDING,
        statusHistory: [
          {
            status: GrievanceStatus.PENDING,
            note: 'Grievance ticket registered in portal.',
            updatedAt: new Date(),
            updatedBy: dto.citizenName || 'Citizen',
          },
        ],
      });

      const saved = await this.grievanceRepo.save(grievance);

      // Load citizen relation for full response
      const fullyLoaded = await this.grievanceRepo.findOne({
        where: { id: saved.id },
        relations: ['citizen'],
      });

      return {
        status: 'success',
        data: {
          message: 'Grievance submitted successfully.',
          ticketNumber: saved.ticketNumber,
          grievance: this.toResponse(fullyLoaded || saved),
        },
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException(
        { message: 'Failed to create grievance', error: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Track a grievance by ticket number — no auth required.
   */
  async trackByTicket(ticketNumber: string) {
    const grievance = await this.grievanceRepo.findOne({
      where: { ticketNumber: ticketNumber.toUpperCase() },
      relations: ['citizen'],
    });

    if (!grievance) {
      throw new NotFoundException(
        `No grievance found with ticket number: ${ticketNumber}`,
      );
    }

    return {
      status: 'success',
      data: this.toPublicTrackingResponse(grievance),
    };
  }

  /**
   * Get all grievances submitted by the logged-in citizen.
   */
  async getMyCitizenGrievances(
    citizenId: number,
    filters: { status?: GrievanceStatus; category?: string; page?: number; limit?: number },
  ) {
    const { status, category, page = 1, limit = 10 } = filters;

    const qb = this.grievanceRepo
      .createQueryBuilder('g')
      .where('g.citizenId = :citizenId', { citizenId })
      .orderBy('g.createdDate', 'DESC');

    if (status) qb.andWhere('g.status = :status', { status });
    if (category) qb.andWhere('g.category = :category', { category });

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      status: 'success',
      data: data.map((g) => this.toResponse(g)),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Admin / Officer-facing
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Get all grievances (admin/officer view) with optional filters.
   */
  async getAll(filters: {
    status?: GrievanceStatus;
    category?: string;
    wardNumber?: number;
    page?: number;
    limit?: number;
  }) {
    const { status, category, wardNumber, page = 1, limit = 20 } = filters;

    const qb = this.grievanceRepo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.citizen', 'citizen')
      .orderBy('g.createdDate', 'DESC');

    if (status) qb.andWhere('g.status = :status', { status });
    if (category) qb.andWhere('g.category = :category', { category });
    if (wardNumber) qb.andWhere('g.wardNumber = :wardNumber', { wardNumber });

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      status: 'success',
      data: data.map((g) => this.toAdminResponse(g)),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Update grievance status (by admin / officer).
   */
  async updateStatus(
    id: number,
    dto: UpdateGrievanceStatusDto,
    officerId: number,
  ) {
    const grievance = await this.grievanceRepo.findOne({
      where: { id },
      relations: ['citizen'],
    });

    if (!grievance) throw new NotFoundException(`Grievance #${id} not found.`);

    grievance.status = dto.status;
    if (dto.assignedDepartment) grievance.assignedDepartment = dto.assignedDepartment;
    if (dto.assignedOfficerId) grievance.assignedOfficerId = dto.assignedOfficerId;

    const stageNote = dto.note || dto.resolutionNotes || '';
    if (stageNote) {
      grievance.resolutionNotes = stageNote;
    }

    // Append to status history
    const history = Array.isArray(grievance.statusHistory)
      ? [...grievance.statusHistory]
      : [];

    history.push({
      status: dto.status,
      note: stageNote || `Status updated to ${dto.status}`,
      updatedAt: new Date(),
      updatedBy: dto.updatedBy || (officerId ? `Officer #${officerId}` : 'Admin'),
      assignedDepartment: dto.assignedDepartment || grievance.assignedDepartment,
    });

    grievance.statusHistory = history;

    if (
      dto.status === GrievanceStatus.RESOLVED ||
      dto.status === GrievanceStatus.CLOSED
    ) {
      grievance.resolvedAt = new Date();
    }

    const updated = await this.grievanceRepo.save(grievance);

    return {
      status: 'success',
      data: {
        message: 'Grievance status updated.',
        grievance: this.toAdminResponse(updated),
      },
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Private helpers
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Generate ticket number: GRV-YYYY-XXXXXX (zero-padded sequential).
   * Finds the highest existing ID and increments by 1 in the ticket.
   */
  private async generateTicketNumber(): Promise<string> {
    const year = new Date().getFullYear();

    // Count grievances for the current year to build sequential number
    const count = await this.grievanceRepo
      .createQueryBuilder('g')
      .where("g.ticketNumber LIKE :prefix", { prefix: `GRV-${year}-%` })
      .getCount();

    const seq = String(count + 1).padStart(6, '0');
    return `GRV-${year}-${seq}`;
  }

  private toResponse(g: GrievanceEntity) {
    return {
      id: g.id,
      ticketNumber: g.ticketNumber,
      title: g.title,
      description: g.description,
      category: g.category,
      address: g.address,
      wardNumber: g.wardNumber,
      attachmentUrls: g.attachmentUrls || [],
      status: g.status,
      assignedDepartment: g.assignedDepartment,
      assignedOfficerId: g.assignedOfficerId,
      resolutionNotes: g.resolutionNotes,
      statusHistory: g.statusHistory || [],
      resolvedAt: g.resolvedAt,
      createdDate: g.createdDate,
      updatedDate: g.updatedDate,
      citizenId: g.citizenId,
      citizen: g.citizen
        ? {
            id: g.citizen.id,
            name: g.citizen.name,
            phone: g.citizen.phone,
            email: g.citizen.email,
          }
        : null,
    };
  }

  private toPublicTrackingResponse(g: GrievanceEntity) {
    return {
      ticketNumber: g.ticketNumber,
      title: g.title,
      category: g.category,
      status: g.status,
      address: g.address,
      wardNumber: g.wardNumber,
      attachmentUrls: g.attachmentUrls || [],
      assignedDepartment: g.assignedDepartment,
      resolutionNotes: g.resolutionNotes,
      statusHistory: g.statusHistory || [],
      resolvedAt: g.resolvedAt,
      createdDate: g.createdDate,
      updatedDate: g.updatedDate,
      citizen: g.citizen
        ? {
            name: g.citizen.name,
            phone: g.citizen.phone ? g.citizen.phone.slice(0, 3) + '******' + g.citizen.phone.slice(-3) : null,
          }
        : null,
    };
  }

  private toAdminResponse(g: GrievanceEntity) {
    return {
      ...this.toResponse(g),
      citizenId: g.citizenId,
      assignedOfficerId: g.assignedOfficerId,
      citizen: g.citizen
        ? {
            id: g.citizen.id,
            name: g.citizen.name,
            phone: g.citizen.phone,
            email: g.citizen.email,
          }
        : null,
    };
  }
}
