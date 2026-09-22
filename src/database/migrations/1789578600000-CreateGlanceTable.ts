import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGlanceTable1789578600000 implements MigrationInterface {
    name = 'CreateGlanceTable1789578600000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "glance_items" (
            "id" SERIAL NOT NULL,
            "title" character varying(255) NOT NULL,
            "value" character varying(100) NOT NULL,
            "tag" character varying(255) NOT NULL DEFAULT '',
            "icon" character varying(100) NOT NULL DEFAULT 'BarChart3',
            "sortOrder" integer NOT NULL DEFAULT '0',
            "active" boolean NOT NULL DEFAULT true,
            "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            CONSTRAINT "PK_glance_items_id" PRIMARY KEY ("id")
        )`);

        // Insert initial default council metrics
        await queryRunner.query(`
            INSERT INTO "glance_items" ("title", "value", "tag", "icon", "sortOrder", "active")
            VALUES 
            ('Citizens Served', '75,000+', 'Across 5 Wards', 'Users', 1, true),
            ('Resolution SLA', '99.4%', 'Avg: 3 Days', 'CheckCircle', 2, true),
            ('Annual Tourists', '5.2M+', 'Sahyadri Gateway', 'Trees', 3, true),
            ('Digital Services', '100%', '100% Online', 'Smartphone', 4, true),
            ('Clean City Rank', '#1 Eco-City', 'Swachh Survekshan', 'Award', 5, true),
            ('Protected Area', '38.2 sq km', 'Eco-Sensitive Zone', 'ShieldCheck', 6, true)
            ON CONFLICT DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "glance_items"`);
    }
}
