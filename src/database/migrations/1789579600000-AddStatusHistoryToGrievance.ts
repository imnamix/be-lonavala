import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusHistoryToGrievance1789579600000 implements MigrationInterface {
  name = 'AddStatusHistoryToGrievance1789579600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "grievance"
      ADD COLUMN IF NOT EXISTS "statusHistory" text DEFAULT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "grievance"
      DROP COLUMN IF EXISTS "statusHistory";
    `);
  }
}
