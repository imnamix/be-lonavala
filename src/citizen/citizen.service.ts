import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { getFirebaseAuth } from '../config/firebase.config';
import { CitizenEntity } from './entities/citizen.entity';
import { GrievanceEntity } from '../grievance/entities/grievance.entity';
import {
  CheckCitizenPhoneDto,
  UpdateCitizenProfileDto,
  VerifyFirebaseTokenDto,
} from './dto/citizen.dto';

@Injectable()
export class CitizenService {
  constructor(
    @InjectRepository(CitizenEntity)
    private readonly citizenRepo: Repository<CitizenEntity>,
    @InjectRepository(GrievanceEntity)
    private readonly grievanceRepo: Repository<GrievanceEntity>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Admin / List all citizens with pagination, search, and grievance statistics
   */
  async findAll(query?: { search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, Number(query?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query?.limit) || 20));
    const skip = (page - 1) * limit;

    const qb = this.citizenRepo.createQueryBuilder('citizen');

    if (query?.search && query.search.trim()) {
      const s = `%${query.search.trim()}%`;
      qb.where(
        '(citizen.name ILIKE :s OR citizen.phone ILIKE :s OR citizen.email ILIKE :s OR citizen.address ILIKE :s)',
        { s },
      );
    }

    qb.orderBy('citizen.createdDate', 'DESC')
      .skip(skip)
      .take(limit);

    const [citizens, total] = await qb.getManyAndCount();

    // Fetch grievance counts for these citizens
    const citizenIds = citizens.map((c) => c.id);
    let grievanceCounts: Record<number, number> = {};
    if (citizenIds.length > 0) {
      const counts = await this.grievanceRepo
        .createQueryBuilder('g')
        .select('g.citizenId', 'citizenId')
        .addSelect('COUNT(g.id)', 'count')
        .where('g.citizenId IN (:...citizenIds)', { citizenIds })
        .groupBy('g.citizenId')
        .getRawMany();

      grievanceCounts = counts.reduce((acc, curr) => {
        acc[Number(curr.citizenId)] = Number(curr.count);
        return acc;
      }, {});
    }

    const data = citizens.map((c) => ({
      ...this.toResponse(c),
      grievancesCount: grievanceCounts[c.id] || 0,
    }));

    return {
      status: 'success',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Admin / Get single citizen details with full grievance list
   */
  async findOne(id: number) {
    const citizen = await this.citizenRepo.findOne({ where: { id } });
    if (!citizen) throw new NotFoundException('Citizen not found.');

    const grievances = await this.grievanceRepo.find({
      where: { citizenId: id },
      order: { createdDate: 'DESC' },
    });

    return {
      status: 'success',
      data: {
        ...this.toResponse(citizen),
        grievances,
        grievancesCount: grievances.length,
      },
    };
  }

  /**
   * Check if a mobile number is already registered in the system.
   */
  async checkPhone(dto: CheckCitizenPhoneDto) {
    const cleanPhone = dto.phone.replace(/\D/g, '').slice(-10);
    const formattedPhone = `+91${cleanPhone}`;

    const citizen = await this.citizenRepo.findOne({
      where: [{ phone: formattedPhone }, { phone: cleanPhone }],
    });

    return {
      status: 'success',
      data: {
        isRegistered: !!citizen,
        phone: formattedPhone,
        name: citizen?.name || null,
      },
    };
  }

  /**
   * Verify Firebase idToken or default OTP, register or login citizen, return backend JWT.
   */
  async verifyAndLogin(dto: VerifyFirebaseTokenDto) {
    try {
      let uid: string | null = null;
      let phone: string | null = null;

      // ── Check OTP verification: only allow valid Firebase idToken OR strictly '123456' ──
      if (dto.idToken && dto.idToken !== 'DEFAULT_OTP_TOKEN') {
        try {
          const firebaseAuth = getFirebaseAuth();
          const decoded = await firebaseAuth.verifyIdToken(dto.idToken);
          uid = decoded.uid;
          phone = decoded.phone_number || null;
        } catch (fbErr) {
          // If Firebase token fails, only allow if dto.otp is strictly '123456'
          if (dto.otp === '123456' && dto.phone) {
            const cleanPhone = dto.phone.replace(/\D/g, '').slice(-10);
            phone = `+91${cleanPhone}`;
            uid = `default_user_${cleanPhone}`;
          } else {
            throw new UnauthorizedException('Invalid OTP. Please enter the correct OTP.');
          }
        }
      } else if (dto.otp === '123456' && dto.phone) {
        // Strictly allow default OTP 123456
        const cleanPhone = dto.phone.replace(/\D/g, '').slice(-10);
        phone = `+91${cleanPhone}`;
        uid = `default_user_${cleanPhone}`;
      } else {
        throw new UnauthorizedException('Invalid OTP. Please enter the correct OTP.');
      }

      if (!phone || !uid) {
        throw new UnauthorizedException(
          'Invalid credentials or phone number missing. Please enter mobile number and OTP.',
        );
      }

      // Find citizen by phone or firebaseUid
      let citizen = await this.citizenRepo.findOne({
        where: [{ phone }, { firebaseUid: uid }],
      });

      // If user is in LOGIN mode (isRegistering === false) and doesn't exist
      if (dto.isRegistering === false && !citizen) {
        throw new NotFoundException(
          'Mobile number is not registered. Please register first.',
        );
      }

      const isNewUser = !citizen;

      if (!citizen) {
        citizen = this.citizenRepo.create({
          firebaseUid: uid,
          phone,
          name: dto.name || null,
          email: dto.email || null,
          address: dto.address || null,
          profilePicture: dto.profilePicture || null,
          isActive: true,
        });
        citizen = await this.citizenRepo.save(citizen);
      } else {
        let needsSave = false;
        if (!citizen.firebaseUid) {
          citizen.firebaseUid = uid;
          needsSave = true;
        }
        if (dto.name && !citizen.name) {
          citizen.name = dto.name;
          needsSave = true;
        }
        if (dto.address && !citizen.address) {
          citizen.address = dto.address;
          needsSave = true;
        }
        if (dto.email && !citizen.email) {
          citizen.email = dto.email;
          needsSave = true;
        }
        if (dto.profilePicture && !citizen.profilePicture) {
          citizen.profilePicture = dto.profilePicture;
          needsSave = true;
        }
        if (needsSave) {
          citizen = await this.citizenRepo.save(citizen);
        }
      }

      if (!citizen.isActive) {
        throw new HttpException(
          { message: 'Account is deactivated. Contact support.' },
          HttpStatus.FORBIDDEN,
        );
      }

      const accessToken = this.generateJwt(citizen);

      return {
        status: 'success',
        data: {
          isNewUser,
          accessToken,
          citizen: this.toResponse(citizen),
        },
      };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      // Firebase errors have a code property
      if (err?.code?.startsWith('auth/')) {
        throw new UnauthorizedException(`Firebase: ${err.message}`);
      }
      throw new HttpException(
        { message: 'Internal server error', error: err.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfile(citizenId: number) {
    const citizen = await this.citizenRepo.findOne({ where: { id: citizenId } });
    if (!citizen) throw new NotFoundException('Citizen not found.');
    return { status: 'success', data: this.toResponse(citizen) };
  }

  async updateProfile(citizenId: number, dto: UpdateCitizenProfileDto) {
    const citizen = await this.citizenRepo.findOne({ where: { id: citizenId } });
    if (!citizen) throw new NotFoundException('Citizen not found.');

    if (dto.name !== undefined) citizen.name = dto.name;
    if (dto.email !== undefined) citizen.email = dto.email;
    if (dto.address !== undefined) citizen.address = dto.address;
    if (dto.profilePicture !== undefined) citizen.profilePicture = dto.profilePicture;

    const updated = await this.citizenRepo.save(citizen);
    return { status: 'success', data: this.toResponse(updated) };
  }

  // ─── Private helpers ──────────────────────────────────────────────────────

  private generateJwt(citizen: CitizenEntity): string {
    const secret =
      this.configService.get<string>('JWT_SECRET') || 'CHANGE_ME_IN_PRODUCTION';
    const expiry = this.configService.get<string>('JWT_EXPIRY') || '24h';

    return jwt.sign(
      {
        id: citizen.id,
        phone: citizen.phone,
        firebaseUid: citizen.firebaseUid,
        type: 'citizen',
      },
      secret,
      { expiresIn: expiry },
    );
  }

  private toResponse(citizen: CitizenEntity) {
    return {
      id: citizen.id,
      phone: citizen.phone,
      name: citizen.name,
      email: citizen.email,
      address: citizen.address,
      profilePicture: citizen.profilePicture || null,
      isActive: citizen.isActive,
      createdDate: citizen.createdDate,
    };
  }
}
