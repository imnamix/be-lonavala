import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourtProceedingTable1789579200000 implements MigrationInterface {
  name = 'CreateCourtProceedingTable1789579200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "court_proceeding" (
      "id" SERIAL NOT NULL,
      "subject" character varying(500) NOT NULL,
      "marathiSubject" character varying(500) NOT NULL DEFAULT '',
      "description" text NOT NULL DEFAULT '',
      "marathiDescription" text NOT NULL DEFAULT '',
      "date" character varying(100) NOT NULL,
      "minutes" text NOT NULL DEFAULT '',
      "marathiMinutes" text NOT NULL DEFAULT '',
      "pdfUrl" text DEFAULT '',
      "fileSize" character varying(50) DEFAULT '',
      "benchOfficers" character varying(255) DEFAULT '',
      "venue" character varying(255) DEFAULT '',
      "status" character varying(50) NOT NULL DEFAULT 'Upcoming',
      "sortOrder" integer NOT NULL DEFAULT 0,
      "active" boolean NOT NULL DEFAULT true,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_court_proceeding_id" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "court_proceeding"`);
  }
}
