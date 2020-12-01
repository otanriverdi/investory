import {MigrationInterface, QueryRunner} from 'typeorm';

export class PositionOwner1606750772020 implements MigrationInterface {
  name = 'PositionOwner1606750772020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" ADD "owner" character varying NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "owner"`);
  }
}
