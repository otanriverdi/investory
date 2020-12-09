import {MigrationInterface, QueryRunner} from 'typeorm';

export class Position1606564317103 implements MigrationInterface {
  name = 'Position1606564317103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" ALTER COLUMN "amount" TYPE numeric(19,8)`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."amount" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "position"."amount" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" ALTER COLUMN "amount" TYPE numeric(19,4)`,
    );
  }
}
