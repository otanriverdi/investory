import {MigrationInterface, QueryRunner} from 'typeorm';

export class ClosePrice1607441821413 implements MigrationInterface {
  name = 'ClosePrice1607441821413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`ALTER TABLE "close_price" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "close_price" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "close_price" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "close_price" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
  }
}
