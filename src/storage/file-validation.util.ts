import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.svg',
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB default

export function validateUploadedFile(
  file: { mimetype: string; size: number; originalname: string },
  options?: {
    allowedMimes?: string[];
    allowedExts?: string[];
    maxSize?: number;
  },
): void {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  const allowedMimes = options?.allowedMimes || ALLOWED_MIME_TYPES;
  const allowedExts = options?.allowedExts || ALLOWED_EXTENSIONS;
  const maxSize = options?.maxSize || MAX_FILE_SIZE_BYTES;

  if (!allowedMimes.includes(file.mimetype)) {
    throw new BadRequestException(
      `File type '${file.mimetype}' is not allowed. Allowed types: ${allowedMimes.join(', ')}`,
    );
  }

  const ext = extname(file.originalname).toLowerCase();
  if (!allowedExts.includes(ext)) {
    throw new BadRequestException(
      `File extension '${ext}' is not allowed. Allowed extensions: ${allowedExts.join(', ')}`,
    );
  }

  if (file.size > maxSize) {
    throw new BadRequestException(
      `File size exceeds the limit of ${Math.round(maxSize / (1024 * 1024))}MB`,
    );
  }
}

export function generateSafeStorageKey(
  folder: string,
  originalFilename: string,
): string {
  const ext = extname(originalFilename).toLowerCase();
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const uniqueId = uuidv4();
  const timestamp = Date.now();
  return `${cleanFolder}/${timestamp}-${uniqueId}${ext}`;
}
