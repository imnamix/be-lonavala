import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepo.create({
      ...createProjectDto,
      startDate: createProjectDto.startDate
        ? new Date(createProjectDto.startDate)
        : undefined,
      targetCompletionDate: createProjectDto.targetCompletionDate
        ? new Date(createProjectDto.targetCompletionDate)
        : undefined,
    });
    return this.projectRepo.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, {
      ...updateProjectDto,
      startDate: updateProjectDto.startDate
        ? new Date(updateProjectDto.startDate)
        : project.startDate,
      targetCompletionDate: updateProjectDto.targetCompletionDate
        ? new Date(updateProjectDto.targetCompletionDate)
        : project.targetCompletionDate,
    });
    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const project = await this.findOne(id);
    await this.projectRepo.remove(project);
    return {
      success: true,
      message: `Project #${id} deleted successfully`,
    };
  }
}
