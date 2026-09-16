import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EN_Upload } from './fileUpload.entity';
import { StorageService } from '../storage/storage.service';
import { validateUploadedFile } from '../storage/file-validation.util';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(EN_Upload)
    private readonly fileUploadRepo: Repository<EN_Upload>,
    private readonly storageService: StorageService,
  ) {}

  async uploadSingleFile(
    file: Express.Multer.File,
    folder = 'uploads',
    title?: string,
  ): Promise<EN_Upload> {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    validateUploadedFile({
      mimetype: file.mimetype,
      size: file.size,
      originalname: file.originalname,
    });

    const result = await this.storageService.uploadFile(file, folder);

    const uploadRecord = this.fileUploadRepo.create({
      fileName: file.originalname,
      fileSize: file.size,
      fileType: file.mimetype,
      fileTitle: title || file.originalname,
      bucket: result.bucket,
      fileUrl: result.url,
      key: result.key,
    });

    return this.fileUploadRepo.save(uploadRecord);
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder = 'uploads',
  ): Promise<EN_Upload[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided for upload');
    }

    const savedRecords: EN_Upload[] = [];
    for (const file of files) {
      const record = await this.uploadSingleFile(file, folder);
      savedRecords.push(record);
    }

    return savedRecords;
  }

  async getAllUploads(): Promise<EN_Upload[]> {
    return this.fileUploadRepo.find({ order: { id: 'DESC' } });
  }

  async getUploadById(id: number): Promise<EN_Upload> {
    const record = await this.fileUploadRepo.findOne({ where: { id } });
    if (!record) {
      throw new BadRequestException(`Upload record with ID ${id} not found`);
    }
    return record;
  }
}
