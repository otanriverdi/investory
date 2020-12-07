import {MigrationInterface, QueryRunner} from 'typeorm';

export class Comment1607342375959 implements MigrationInterface {
  name = 'Comment1607342375959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "username"`);
  }
}
