import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoticeAndProjectTables1789578400000 implements MigrationInterface {
  name = 'CreateNoticeAndProjectTables1789578400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "notice" (
      "id" SERIAL NOT NULL,
      "title" character varying(500) NOT NULL,
      "subject" character varying(500),
      "category" character varying(100) NOT NULL DEFAULT 'General',
      "gazetteRefNo" character varying(200),
      "status" character varying(50) NOT NULL DEFAULT 'DRAFT',
      "issuingDepartmentId" character varying(100),
      "publishedDate" TIMESTAMP WITH TIME ZONE,
      "issuedBy" character varying(255),
      "description" text,
      "directives" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "attachmentUrl" character varying(1000),
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_notice_id" PRIMARY KEY ("id")
    )`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "project" (
      "id" SERIAL NOT NULL,
      "title" character varying(500) NOT NULL,
      "marathiTitle" character varying(500),
      "projectCode" character varying(100),
      "category" character varying(100) NOT NULL DEFAULT 'General',
      "status" character varying(50) NOT NULL DEFAULT 'PLANNED',
      "departmentId" character varying(100),
      "location" character varying(300),
      "contractorName" character varying(255),
      "sanctionedBudget" character varying(100),
      "startDate" TIMESTAMP WITH TIME ZONE,
      "targetCompletionDate" TIMESTAMP WITH TIME ZONE,
      "physicalProgress" double precision NOT NULL DEFAULT 0,
      "financialProgress" double precision NOT NULL DEFAULT 0,
      "description" text,
      "highlights" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "coverImageUrl" character varying(1000),
      "attachmentUrl" character varying(1000),
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_project_id" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "project"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "notice"`);
  }
}
