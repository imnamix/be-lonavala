import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadDto } from './upload.dto';
import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { EN_Upload } from './fileUpload.entity';
import { v4 as uuid } from 'uuid';
import { Exception } from 'handlebars';
import { NotFoundError } from 'rxjs';
import { Console } from 'console';
import { S3Service } from './s3.service';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(EN_Upload)
    private readonly fileUploadRepo: Repository<EN_Upload>,
    private readonly s3service: S3Service,
  ) {}

  async uploadDocs(docs: any) {
    let savedDocs: any = [];
    const maxSizeInBytes = 5 * 1024 * 1024;
    let mimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    // if (!docs) {
    //   throw new DocsNotFoundException();
    // }

    //CHECKS FILE SIZE AND TYPE
    // for (const doc of docs) {
    //   if (doc.size >= maxSizeInBytes) {
    //     throw new DocFileSizeException();
    //   } else if (!mimeTypes.includes(doc.mimetype)) {
    //     throw new FileTypeNotSupportedException();
    //   }
    // }

    // if (!docs) {
    //  return NotFoundError;
    // }

    let details = {
      for: 'docs',
      uId: uuid(),
    };

    // let uploadedDocs = await this.s3service.uploadFiles(docs, details);
    // await Promise.all(
    //   uploadedDocs.map(async (doc: any) => {
    //     let extFileData: any = {
    //       bucketFileId: doc.objectId,
    //       fileName: doc.fileName,
    //       fileUrl: doc.fileUrl,
    //       fileType: doc.mimetype,
    //       fileSize: doc.size,
    //       fileTitle: doc.fileName,
    //       key: doc.key,
    //       bucket: process.env.BUCKET,
    //     };

    //     const newSaveDoc = this.fileUploadRepo.create(extFileData);
    //     const savedDoc: any = await this.fileUploadRepo.save(newSaveDoc);
    //     savedDocs.push(savedDoc);
    //   }),
    // );
    return savedDocs;
  }
}
