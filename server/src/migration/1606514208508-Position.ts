import {MigrationInterface, QueryRunner} from 'typeorm';

export class Position1606514208508 implements MigrationInterface {
  name = 'Position1606514208508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "commission"`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD "commission" numeric(19,4) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "commission"`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD "commission" money NOT NULL DEFAULT '$0.00'`,
    );
  }
}
