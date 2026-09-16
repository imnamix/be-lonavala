import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789573181951 implements MigrationInterface {
    name = 'InitialSchema1789573181951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fileUpload" ("id" SERIAL NOT NULL, "fileName" character varying, "fileSize" integer, "fileType" character varying, "fileTitle" character varying, "bucket" character varying, "fileUrl" character varying NOT NULL, "key" character varying NOT NULL DEFAULT '123', "createdDate" TIMESTAMP DEFAULT now(), "updatedDate" TIMESTAMP DEFAULT now(), "createdBy" integer, "updatedBy" integer, CONSTRAINT "PK_82d6ce3c9405390cec5c1ef460b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."permission_permission_enum" AS ENUM('READ', 'WRITE', 'UPDATE', 'DELETE', 'MANAGE')`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "permission" "public"."permission_permission_enum" NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedBy" integer, "role_id" integer, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."role_role_enum" AS ENUM('SUPER_ADMIN', 'CONTENT_ADMIN', 'CONTENT_EDITOR', 'GRIEVANCE_OFFICER', 'DEPARTMENT_ADMIN', 'DEPARTMENT_OFFICER', 'REPORTING_USER')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" "public"."role_role_enum" NOT NULL, "createdDate" TIMESTAMP DEFAULT now(), "updatedDate" TIMESTAMP DEFAULT now(), "createdBy" integer, "updatedBy" integer, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(100), "password" text NOT NULL, "firstName" character varying(150), "middleName" character varying(150), "lastName" character varying(150), "phone" character varying(15), "gender" character varying(10), "isVerified" boolean NOT NULL DEFAULT false, "createdDate" TIMESTAMP DEFAULT now(), "updatedDate" TIMESTAMP DEFAULT now(), "createdBy" integer, "updatedBy" integer, "rolesId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_5493e241ab6c27f36c7f9bae51" UNIQUE ("rolesId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."template_type_enum" AS ENUM('EMAIL', 'SMS', 'APP_NOTIFICATION', 'PDF')`);
        await queryRunner.query(`CREATE TABLE "template" ("id" SERIAL NOT NULL, "name" character varying(100), "subject" character varying(500), "body" text, "type" "public"."template_type_enum" NOT NULL, "createdDate" TIMESTAMP DEFAULT now(), "updatedDate" TIMESTAMP DEFAULT now(), "createdBy" integer, "updatedBy" integer, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homepage_slide_button" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "url" character varying(500) NOT NULL, "icon" character varying(100) NOT NULL DEFAULT '', "color" character varying(50) NOT NULL DEFAULT 'primary', "active" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "slide_id" integer, CONSTRAINT "PK_e32f65ea39d7a3c5d73e1d29b42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homepage_slide_tag" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "icon" character varying(100) NOT NULL DEFAULT '', "active" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "slide_id" integer, CONSTRAINT "PK_6eef9512747060c08cf7a060bbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homepage_slide" ("id" SERIAL NOT NULL, "slideTitle" character varying(255) NOT NULL, "alignment" character varying(50) NOT NULL DEFAULT 'left', "badgeEn" character varying(200) NOT NULL DEFAULT '', "badgeMr" character varying(200) NOT NULL DEFAULT '', "headlineEn" text NOT NULL DEFAULT '', "headlineMr" text NOT NULL DEFAULT '', "taglineEn" text NOT NULL DEFAULT '', "taglineMr" text NOT NULL DEFAULT '', "mediaUrl" character varying(1000) NOT NULL, "showButtons" boolean NOT NULL DEFAULT true, "showTags" boolean NOT NULL DEFAULT true, "active" boolean NOT NULL DEFAULT true, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9b8836e95a08bdd666d8bda47ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "homepage_config" ("id" SERIAL NOT NULL, "announcement" text DEFAULT '', "announcementActive" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e09e51f28d66dd4060d1c32d7cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "about_us_mission_item" ("id" SERIAL NOT NULL, "itemText" text NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "about_us_id" integer, CONSTRAINT "PK_24d8f538a9e7046669dba3b2360" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "about_us_communique" ("id" SERIAL NOT NULL, "officerName" character varying(200) NOT NULL DEFAULT '', "designation" character varying(200) NOT NULL DEFAULT '', "phone" character varying(50) NOT NULL DEFAULT '', "email" character varying(150) NOT NULL DEFAULT '', "mediaUrl" character varying(1000) NOT NULL DEFAULT '', "title" character varying(255) NOT NULL DEFAULT '', "subtitle" character varying(255) NOT NULL DEFAULT '', "messageBody" text NOT NULL DEFAULT '', "signOff" character varying(255) NOT NULL DEFAULT '', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_23e58105b378de094a465f6d8db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "about_us" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "establishedYear" character varying(50) NOT NULL DEFAULT '1877', "yearsOfService" character varying(50) NOT NULL DEFAULT '147+ Years', "elevation" character varying(100) NOT NULL DEFAULT '622 m', "mediaUrl" character varying(1000) NOT NULL DEFAULT '', "description" text NOT NULL DEFAULT '', "vision" text NOT NULL DEFAULT '', "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "communique_id" integer, CONSTRAINT "REL_23e58105b378de094a465f6d8d" UNIQUE ("communique_id"), CONSTRAINT "PK_f9643a00dea811eecf941ab4fdc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_383892d758d08d346f837d3d8b7" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5493e241ab6c27f36c7f9bae51a" FOREIGN KEY ("rolesId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homepage_slide_button" ADD CONSTRAINT "FK_b0ea2ec18afa863c97bfcb31dfc" FOREIGN KEY ("slide_id") REFERENCES "homepage_slide"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "homepage_slide_tag" ADD CONSTRAINT "FK_340498400afd1ccf1cd2ede91ce" FOREIGN KEY ("slide_id") REFERENCES "homepage_slide"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "about_us_mission_item" ADD CONSTRAINT "FK_23d5617f74a1be97934e4937749" FOREIGN KEY ("about_us_id") REFERENCES "about_us"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "about_us" ADD CONSTRAINT "FK_23e58105b378de094a465f6d8db" FOREIGN KEY ("communique_id") REFERENCES "about_us_communique"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "about_us" DROP CONSTRAINT "FK_23e58105b378de094a465f6d8db"`);
        await queryRunner.query(`ALTER TABLE "about_us_mission_item" DROP CONSTRAINT "FK_23d5617f74a1be97934e4937749"`);
        await queryRunner.query(`ALTER TABLE "homepage_slide_tag" DROP CONSTRAINT "FK_340498400afd1ccf1cd2ede91ce"`);
        await queryRunner.query(`ALTER TABLE "homepage_slide_button" DROP CONSTRAINT "FK_b0ea2ec18afa863c97bfcb31dfc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5493e241ab6c27f36c7f9bae51a"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_383892d758d08d346f837d3d8b7"`);
        await queryRunner.query(`DROP TABLE "about_us"`);
        await queryRunner.query(`DROP TABLE "about_us_communique"`);
        await queryRunner.query(`DROP TABLE "about_us_mission_item"`);
        await queryRunner.query(`DROP TABLE "homepage_config"`);
        await queryRunner.query(`DROP TABLE "homepage_slide"`);
        await queryRunner.query(`DROP TABLE "homepage_slide_tag"`);
        await queryRunner.query(`DROP TABLE "homepage_slide_button"`);
        await queryRunner.query(`DROP TABLE "template"`);
        await queryRunner.query(`DROP TYPE "public"."template_type_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_role_enum"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_permission_enum"`);
        await queryRunner.query(`DROP TABLE "fileUpload"`);
    }

}
