import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfilePictureToCitizen1789579500000 implements MigrationInterface {
  name = 'AddProfilePictureToCitizen1789579500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "citizen"
      ADD COLUMN IF NOT EXISTS "profilePicture" text DEFAULT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "citizen"
      DROP COLUMN IF EXISTS "profilePicture";
    `);
  }
}
