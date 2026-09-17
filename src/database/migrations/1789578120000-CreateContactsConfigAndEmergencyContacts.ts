import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactsConfigAndEmergencyContacts1789578120000
  implements MigrationInterface
{
  name = 'CreateContactsConfigAndEmergencyContacts1789578120000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "contacts_config" (
        "id" SERIAL NOT NULL,
        "whatsappHelpline" character varying(50) DEFAULT '+91 94235 88990',
        "complexName" character varying(255) NOT NULL DEFAULT 'Administrative Complex',
        "addressLine1" character varying(255) NOT NULL DEFAULT 'Old Mumbai-Pune Highway, Near Kumar Resort',
        "addressLine2" character varying(255) NOT NULL DEFAULT 'Lonavala, Dist. Pune, Maharashtra',
        "pinCode" character varying(20) NOT NULL DEFAULT '410401',
        "epabxPhones" character varying(150) NOT NULL DEFAULT '+91 2114 273030 / 273031 / 273032',
        "officialEmail" character varying(150) NOT NULL DEFAULT 'contact@lonavalamc.gov.in',
        "coEmail" character varying(150) NOT NULL DEFAULT 'co@lonavalamc.gov.in',
        "workingHours" character varying(200) NOT NULL DEFAULT 'Monday to Saturday: 09:45 AM – 05:45 PM',
        "workingHoursNote" character varying(255) NOT NULL DEFAULT '(Closed on 2nd & 4th Saturdays and Public Holidays)',
        "mapEmbedUrl" text NOT NULL DEFAULT '',
        "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contacts_config_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "emergency_contact" (
        "id" SERIAL NOT NULL,
        "name" character varying(255) NOT NULL,
        "number" character varying(100) NOT NULL,
        "icon" character varying(100) NOT NULL DEFAULT 'Phone',
        "category" character varying(50) NOT NULL DEFAULT 'emergency',
        "sortOrder" integer NOT NULL DEFAULT '0',
        "active" boolean NOT NULL DEFAULT true,
        "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_emergency_contact_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "emergency_contact"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "contacts_config"`);
  }
}
