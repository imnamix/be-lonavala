import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFaqTable1789578300000 implements MigrationInterface {
    name = 'CreateFaqTable1789578300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "faq" (
            "id" SERIAL NOT NULL,
            "question" character varying(500) NOT NULL,
            "answer" text NOT NULL,
            "category" character varying(100) NOT NULL DEFAULT 'General',
            "sortOrder" integer NOT NULL DEFAULT '0',
            "active" boolean NOT NULL DEFAULT true,
            "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_faq_id" PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "faq"`);
    }
}
