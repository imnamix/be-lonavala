import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImportantUpdateTable1789579700000 implements MigrationInterface {
  name = 'CreateImportantUpdateTable1789579700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "important_update" (
      "id" SERIAL NOT NULL,
      "title" character varying(500) NOT NULL,
      "tag" character varying(100) NOT NULL DEFAULT 'NEW',
      "tagBgColor" character varying(50),
      "tagTextColor" character varying(50),
      "actionType" character varying(50) NOT NULL DEFAULT 'CUSTOM_PAGE',
      "fileUrl" character varying(1000),
      "fileName" character varying(255),
      "fileSize" character varying(50),
      "fileType" character varying(50),
      "externalUrl" character varying(1000),
      "openInNewTab" boolean NOT NULL DEFAULT true,
      "internalRoute" character varying(500),
      "slug" character varying(255),
      "summary" character varying(1000),
      "description" text,
      "featuredImage" character varying(1000),
      "attachments" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "images" jsonb NOT NULL DEFAULT '[]'::jsonb,
      "isActive" boolean NOT NULL DEFAULT true,
      "isPinned" boolean NOT NULL DEFAULT false,
      "priority" integer NOT NULL DEFAULT 0,
      "startDate" TIMESTAMP WITH TIME ZONE,
      "endDate" TIMESTAMP WITH TIME ZONE,
      "viewsCount" integer NOT NULL DEFAULT 0,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_important_update_id" PRIMARY KEY ("id"),
      CONSTRAINT "UQ_important_update_slug" UNIQUE ("slug")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "important_update"`);
  }
}
