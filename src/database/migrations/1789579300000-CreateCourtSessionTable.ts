import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourtSessionTable1789579300000 implements MigrationInterface {
  name = 'CreateCourtSessionTable1789579300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "court_session" (
      "id" SERIAL NOT NULL,
      "sessionTitle" character varying(500) NOT NULL,
      "marathiSessionTitle" character varying(500) NOT NULL DEFAULT '',
      "hearingDate" character varying(100) NOT NULL,
      "time" character varying(100) NOT NULL DEFAULT '11:00 AM',
      "courtForum" character varying(255) NOT NULL DEFAULT '',
      "presidingBench" character varying(255) NOT NULL DEFAULT '',
      "casesListed" jsonb NOT NULL DEFAULT '[]',
      "sessionAgenda" text NOT NULL DEFAULT '',
      "marathiSessionAgenda" text NOT NULL DEFAULT '',
      "status" character varying(50) NOT NULL DEFAULT 'Scheduled',
      "noticePdfUrl" text DEFAULT '',
      "sortOrder" integer NOT NULL DEFAULT 0,
      "active" boolean NOT NULL DEFAULT true,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_court_session_id" PRIMARY KEY ("id")
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "court_session"`);
  }
}
