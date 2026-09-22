import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDurationToCouncilResolutionTable1789579000000 implements MigrationInterface {
  name = 'AddDurationToCouncilResolutionTable1789579000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "council_resolution" ALTER COLUMN "resolutionNumber" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "council_resolution" ADD COLUMN IF NOT EXISTS "durationFrom" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "council_resolution" ADD COLUMN IF NOT EXISTS "durationTo" character varying(50)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "council_resolution" DROP COLUMN IF EXISTS "durationTo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "council_resolution" DROP COLUMN IF EXISTS "durationFrom"`,
    );
  }
}
