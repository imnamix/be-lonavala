import { MigrationInterface, QueryRunner } from "typeorm";

export class TourismAndContacts1789576391107 implements MigrationInterface {
    name = 'TourismAndContacts1789576391107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tourism_important_point" ("id" SERIAL NOT NULL, "icon" character varying(100) NOT NULL DEFAULT 'Info', "text" text NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "spot_id" integer, CONSTRAINT "PK_e77c4d42fb297a8845421a27e37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tourism_gallery_media" ("id" SERIAL NOT NULL, "mediaUrl" character varying(1000) NOT NULL, "mediaType" character varying(50) NOT NULL DEFAULT 'image', "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "spot_id" integer, CONSTRAINT "PK_ba86420ca7b00298e013d05f514" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tourism_spot" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "label" character varying(255) NOT NULL DEFAULT '', "distance" character varying(150) NOT NULL DEFAULT '', "mediaUrl" character varying(1000) NOT NULL, "description" text NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6f8d2f47697c8b94e885e6016" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tourism_highlight" ("id" SERIAL NOT NULL, "key" character varying(150) NOT NULL, "value" character varying(255) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "spot_id" integer, CONSTRAINT "PK_589c5d16fac04d5b7145df49a95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "council_member" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "marathiName" character varying(200) NOT NULL DEFAULT '', "designation" character varying(200) NOT NULL, "roleCategory" character varying(100) NOT NULL DEFAULT 'Corporator', "ward" character varying(200) NOT NULL DEFAULT 'Municipal Council', "tenure" character varying(100) NOT NULL DEFAULT '2024 - 2029', "committee" character varying(255), "phone" character varying(50) NOT NULL DEFAULT '', "email" character varying(150) NOT NULL DEFAULT '', "address" character varying(300), "imageUrl" character varying(1000) NOT NULL DEFAULT '', "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6620361345f37130c3960fd80e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "office_contact" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "phone" character varying(50) NOT NULL, "altPhone" character varying(50), "email" character varying(150), "location" character varying(300), "timing" character varying(100) DEFAULT '24x7', "category" character varying(50) NOT NULL DEFAULT 'administrative', "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_edfefe95818bd3c8d3738c4f3d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tourism_important_point" ADD CONSTRAINT "FK_c2f9a2029332242d1aeab150608" FOREIGN KEY ("spot_id") REFERENCES "tourism_spot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourism_gallery_media" ADD CONSTRAINT "FK_2acc9976de758b4ff96f3e131be" FOREIGN KEY ("spot_id") REFERENCES "tourism_spot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tourism_highlight" ADD CONSTRAINT "FK_adbc702ac39bc1c2c4d6c130d41" FOREIGN KEY ("spot_id") REFERENCES "tourism_spot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tourism_highlight" DROP CONSTRAINT "FK_adbc702ac39bc1c2c4d6c130d41"`);
        await queryRunner.query(`ALTER TABLE "tourism_gallery_media" DROP CONSTRAINT "FK_2acc9976de758b4ff96f3e131be"`);
        await queryRunner.query(`ALTER TABLE "tourism_important_point" DROP CONSTRAINT "FK_c2f9a2029332242d1aeab150608"`);
        await queryRunner.query(`DROP TABLE "office_contact"`);
        await queryRunner.query(`DROP TABLE "council_member"`);
        await queryRunner.query(`DROP TABLE "tourism_highlight"`);
        await queryRunner.query(`DROP TABLE "tourism_spot"`);
        await queryRunner.query(`DROP TABLE "tourism_gallery_media"`);
        await queryRunner.query(`DROP TABLE "tourism_important_point"`);
    }

}
