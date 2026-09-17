import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFaqTable1789626200568 implements MigrationInterface {
    name = 'AddFaqTable1789626200568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT true, "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "faq"`);
    }

}
