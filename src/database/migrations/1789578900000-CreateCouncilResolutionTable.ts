import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCouncilResolutionTable1789578900000 implements MigrationInterface {
  name = 'CreateCouncilResolutionTable1789578900000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "council_resolution" (
      "id" SERIAL NOT NULL,
      "resolutionNumber" character varying(200) NOT NULL,
      "title" character varying(500) NOT NULL,
      "marathiTitle" character varying(500) DEFAULT '',
      "meetingType" character varying(200) NOT NULL DEFAULT 'General Body Meeting',
      "resolutionDate" character varying(50),
      "description" text DEFAULT '',
      "fileUrl" character varying(1000),
      "fileName" character varying(255),
      "fileSize" character varying(50) DEFAULT '1.2 MB',
      "isActive" boolean NOT NULL DEFAULT true,
      "displayOrder" integer NOT NULL DEFAULT 0,
      "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_council_resolution_id" PRIMARY KEY ("id")
    )`);

    // Seed initial council resolutions
    await queryRunner.query(`INSERT INTO "council_resolution" ("resolutionNumber", "title", "marathiTitle", "meetingType", "resolutionDate", "fileSize", "isActive", "displayOrder") VALUES
      ('GBM-2025/04', 'Minutes of General Body Meeting - April 2025', 'सर्वसाधारण सभा इतिवृत्त - एप्रिल २०२५', 'General Body Meeting', '2025-04-25', '1.8 MB', true, 1),
      ('RES-2025/42', 'Resolution No. 42: Approval for Bushi Dam Promenade Masterplan', 'ठराव क्र. ४२: भुशी डॅम प्रोमेनेड विकास आराखडा मंजुरी', 'Special Meeting', '2025-03-18', '920 KB', true, 2),
      ('GAZ-2024/09', 'Ward Demarcation & Voter Boundary Gazette 2024', 'प्रभाग रचना व मतदार यादी सीमांकन राजपत्र २०२४', 'Gazette Notification', '2024-11-10', '4.5 MB', true, 3),
      ('DOC-2024/11', 'Code of Conduct & Rules of Procedure for Corporators', 'नगरसेवकांची आचारसंहिता व कामकाज नियमावली', 'Standing Order', '2024-08-05', '2.1 MB', true, 4)
      ON CONFLICT DO NOTHING`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "council_resolution"`);
  }
}
