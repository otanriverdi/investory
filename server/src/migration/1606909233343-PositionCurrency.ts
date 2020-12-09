import {MigrationInterface, QueryRunner} from 'typeorm';

export class PositionCurrency1606909233343 implements MigrationInterface {
  name = 'PositionCurrency1606909233343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."currency" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" ALTER COLUMN "currency" SET DEFAULT 'USD'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" ALTER COLUMN "currency" SET DEFAULT 'EUR'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."currency" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
