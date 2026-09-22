import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { QueryDepartmentDto } from './dto/query-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async findAll(query?: QueryDepartmentDto): Promise<Department[]> {
    const qb = this.departmentRepository.createQueryBuilder('dept');

    if (query?.isActive !== undefined) {
      qb.andWhere('dept.isActive = :isActive', { isActive: query.isActive });
    }

    if (query?.search && query.search.trim() !== '') {
      const s = `%${query.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(dept.name) LIKE :s OR LOWER(dept.marathiName) LIKE :s OR LOWER(dept.headOfficer) LIKE :s OR LOWER(dept.designation) LIKE :s OR LOWER(dept.clerkName) LIKE :s OR LOWER(dept.location) LIKE :s OR LOWER(dept.email) LIKE :s OR LOWER(dept.phone) LIKE :s OR LOWER(dept.clerkPhone) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('dept.displayOrder', 'ASC').addOrderBy('dept.id', 'ASC');

    return qb.getMany();
  }

  async findOne(idOrSlugOrCode: string | number): Promise<Department> {
    let dept: Department | null = null;

    if (typeof idOrSlugOrCode === 'number' || /^\d+$/.test(String(idOrSlugOrCode))) {
      const numId = Number(idOrSlugOrCode);
      dept = await this.departmentRepository.findOne({ where: { id: numId } });
    }

    if (!dept) {
      dept = await this.departmentRepository.findOne({
        where: [
          { slug: String(idOrSlugOrCode) },
          { code: String(idOrSlugOrCode) },
        ],
      });
    }

    if (!dept) {
      const stripped = String(idOrSlugOrCode).replace(/^dept-/, '');
      dept = await this.departmentRepository.findOne({
        where: [
          { slug: stripped },
          { code: stripped },
          { code: `dept-${stripped}` },
        ],
      });
    }

    if (!dept) {
      throw new NotFoundException(
        `Department with identifier "${idOrSlugOrCode}" not found`,
      );
    }

    return dept;
  }

  async create(dto: CreateDepartmentDto): Promise<Department> {
    const slug =
      dto.slug?.trim() ||
      dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    // Check slug uniqueness
    const existing = await this.departmentRepository.findOne({
      where: { slug },
    });
    if (existing) {
      throw new BadRequestException(
        `Department with slug "${slug}" already exists`,
      );
    }

    const code = dto.code?.trim() || `dept-${slug}`;

    const department = this.departmentRepository.create({
      ...dto,
      slug,
      code,
      responsibilities: dto.responsibilities || [],
      services: dto.services || [],
      documents: dto.documents || [],
      stats: dto.stats || [],
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      displayOrder: dto.displayOrder ?? 0,
    });

    return this.departmentRepository.save(department);
  }

  async update(
    idOrSlug: string | number,
    dto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.findOne(idOrSlug);

    if (dto.slug && dto.slug !== department.slug) {
      const existing = await this.departmentRepository.findOne({
        where: { slug: dto.slug },
      });
      if (existing && existing.id !== department.id) {
        throw new BadRequestException(
          `Department with slug "${dto.slug}" already exists`,
        );
      }
    }

    Object.assign(department, dto);
    return this.departmentRepository.save(department);
  }

  async toggleActive(idOrSlug: string | number): Promise<Department> {
    const department = await this.findOne(idOrSlug);
    department.isActive = !department.isActive;
    return this.departmentRepository.save(department);
  }

  async remove(idOrSlug: string | number): Promise<{ message: string }> {
    const department = await this.findOne(idOrSlug);
    await this.departmentRepository.remove(department);
    return {
      message: `Department "${department.name}" removed successfully`,
    };
  }
}
