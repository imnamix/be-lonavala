import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGalleryToProjectTable1789578500000 implements MigrationInterface {
  name = 'AddGalleryToProjectTable1789578500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD COLUMN IF NOT EXISTS "gallery" jsonb NOT NULL DEFAULT '[]'::jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN IF EXISTS "gallery"`);
  }
}
