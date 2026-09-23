import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCitizenAndGrievanceTables1789579400000 implements MigrationInterface {
  name = 'CreateCitizenAndGrievanceTables1789579400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "citizen" (
        "id" SERIAL NOT NULL,
        "firebaseUid" character varying(128) NOT NULL,
        "phone" character varying(20) NOT NULL,
        "name" character varying(150) DEFAULT NULL,
        "email" character varying(150) DEFAULT NULL,
        "address" text DEFAULT NULL,
        "isActive" boolean NOT NULL DEFAULT true,
        "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_citizen_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_citizen_firebaseUid" UNIQUE ("firebaseUid"),
        CONSTRAINT "UQ_citizen_phone" UNIQUE ("phone")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "grievance" (
        "id" SERIAL NOT NULL,
        "ticketNumber" character varying(30) NOT NULL,
        "citizenId" integer DEFAULT NULL,
        "title" character varying(255) NOT NULL,
        "description" text NOT NULL,
        "category" character varying(50) NOT NULL DEFAULT 'OTHER',
        "address" text DEFAULT NULL,
        "wardNumber" integer DEFAULT NULL,
        "attachmentUrls" text DEFAULT NULL,
        "status" character varying(50) NOT NULL DEFAULT 'PENDING',
        "assignedDepartment" character varying(150) DEFAULT NULL,
        "assignedOfficerId" integer DEFAULT NULL,
        "resolutionNotes" text DEFAULT NULL,
        "resolvedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL,
        "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_grievance_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_grievance_ticketNumber" UNIQUE ("ticketNumber"),
        CONSTRAINT "FK_grievance_citizenId" FOREIGN KEY ("citizenId") REFERENCES "citizen"("id") ON DELETE SET NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "grievance"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "citizen"`);
  }
}
