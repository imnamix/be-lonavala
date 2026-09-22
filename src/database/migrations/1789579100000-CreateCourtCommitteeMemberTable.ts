import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourtCommitteeMemberTable1789579100000 implements MigrationInterface {
  name = 'CreateCourtCommitteeMemberTable1789579100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "court_committee_member" (
      "id" SERIAL NOT NULL,
      "name" character varying(255) NOT NULL,
      "marathiName" character varying(255) NOT NULL DEFAULT '',
      "designation" character varying(255) NOT NULL DEFAULT '',
      "role" character varying(150) NOT NULL DEFAULT 'Member',
      "category" character varying(150) NOT NULL DEFAULT 'Committee Member',
      "phone" character varying(50) NOT NULL DEFAULT '',
      "email" character varying(150) NOT NULL DEFAULT '',
      "ward" character varying(255) DEFAULT '',
      "experience" character varying(500) DEFAULT '',
      "image" text DEFAULT '',
      "responsibilities" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "sortOrder" integer NOT NULL DEFAULT 0,
      "active" boolean NOT NULL DEFAULT true,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_court_committee_member_id" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "court_committee_member"`);
  }
}
