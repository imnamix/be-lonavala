export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
  mimeType: string;
  size: number;
}

export interface StorageProvider {
  upload(
    fileBuffer: Buffer,
    key: string,
    mimeType: string,
  ): Promise<UploadResult>;
  delete(key: string): Promise<void>;
  getSignedUrl?(key: string, expiresIn?: number): Promise<string>;
}
