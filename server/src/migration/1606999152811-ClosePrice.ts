import {MigrationInterface, QueryRunner} from 'typeorm';

export class ClosePrice1606999152811 implements MigrationInterface {
  name = 'ClosePrice1606999152811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "close_price" DROP CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816"`,
    );
    await queryRunner.query(
      `ALTER TABLE "close_price" RENAME COLUMN "createdAt" TO "closedAt"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "close_price" ADD CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "close_price" DROP CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "close_price" RENAME COLUMN "closedAt" TO "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "close_price" ADD CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
