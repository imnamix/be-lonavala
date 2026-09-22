import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDepartmentTable1789578700000 implements MigrationInterface {
  name = 'CreateDepartmentTable1789578700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "department" (
      "id" SERIAL NOT NULL,
      "code" character varying(100),
      "name" character varying(255) NOT NULL,
      "marathiName" character varying(255),
      "slug" character varying(255) NOT NULL,
      "icon" character varying(100) NOT NULL DEFAULT 'Building2',
      "headOfficer" character varying(255),
      "headOfficerImage" character varying(1000),
      "designation" character varying(255),
      "email" character varying(255),
      "phone" character varying(100),
      "location" character varying(500),
      "overview" text,
      "responsibilities" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "services" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "documents" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "stats" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "clerkName" character varying(255),
      "clerkPhone" character varying(100),
      "clerkEmail" character varying(255),
      "isActive" boolean NOT NULL DEFAULT true,
      "displayOrder" integer NOT NULL DEFAULT 0,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_department_slug" UNIQUE ("slug"),
      CONSTRAINT "PK_department_id" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "department"`);
  }
}
