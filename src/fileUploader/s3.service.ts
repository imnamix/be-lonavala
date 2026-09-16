import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { EN_Upload } from './fileUpload.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  constructor(
    @InjectRepository(EN_Upload)
    private readonly fileUploadRepo: Repository<EN_Upload>,
  ) {}

  s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  uploadParams: any = {
    Bucket: process.env.BUCKET,
    Key: '',
    Body: null,
    ContentType: 'application/pdf', // as we are uploading pdf only
    ContentDisposition: 'inline',
  };

  async uploadLetterPdf(
    pdfBuffer: Buffer,
    details: { uId: string; letterType: string; employeeName: string },
  ) {
    if (!pdfBuffer) {
      throw new Error('No PDF buffer received for upload');
    }

    const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
    const fileName = `${details.employeeName.replace(
      / /g,
      '_',
    )}_${details.letterType.replace(/ /g, '_')}_${timestamp}.pdf`;

    this.uploadParams.Body = pdfBuffer;
    this.uploadParams.Key = `${details.uId}/${fileName}`;

    try {
      const s3Data = await this.s3Client.upload(this.uploadParams).promise();
      // console.log('PDF uploaded successfully:', s3Data.Location);

      const saveData: any = {
        fileName: 'letter.pdf',
        fileUrl: s3Data.Location,
        fileType: 'application/pdf',
        key: s3Data.Key,
        bucket: process.env.BUCKET,
      };

      const savedDoc = this.fileUploadRepo.create(saveData);
      await this.fileUploadRepo.save(savedDoc);

      return {
        fileUrl: s3Data.Location,
        key: s3Data.Key,
        bucket: process.env.BUCKET,
      };
    } catch (error) {
      console.error('Error uploading PDF to S3:', error);
      throw new Error('Failed to upload PDF to S3');
    }
  }

  async deleteFileFromS3(key: string): Promise<void> {
    const params = {
      Bucket: process.env.BUCKET,
      Key: key,
    };

    try {
      await this.s3Client.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }
}
