import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageToCouncilMember1789578200000
  implements MigrationInterface
{
  name = 'AddMessageToCouncilMember1789578200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "council_member" ADD COLUMN IF NOT EXISTS "message" text DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "council_member" DROP COLUMN IF EXISTS "message"`,
    );
  }
}
