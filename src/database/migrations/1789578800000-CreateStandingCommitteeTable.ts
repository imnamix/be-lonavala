import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStandingCommitteeTable1789578800000 implements MigrationInterface {
  name = 'CreateStandingCommitteeTable1789578800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "standing_committee" (
      "id" SERIAL NOT NULL,
      "name" character varying(255) NOT NULL,
      "marathiName" character varying(255) DEFAULT '',
      "description" text DEFAULT '',
      "chairmanId" integer,
      "memberIds" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "isActive" boolean NOT NULL DEFAULT true,
      "displayOrder" integer NOT NULL DEFAULT 0,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_standing_committee_id" PRIMARY KEY ("id"),
      CONSTRAINT "FK_standing_committee_chairmanId" FOREIGN KEY ("chairmanId") REFERENCES "council_member"("id") ON DELETE SET NULL ON UPDATE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "standing_committee"`);
  }
}
