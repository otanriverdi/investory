import {MigrationInterface, QueryRunner} from 'typeorm';

export class ClosePrice1606995162284 implements MigrationInterface {
  name = 'ClosePrice1606995162284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "close_price" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "positionId" integer, CONSTRAINT "REL_a0cd0feeb8433db5de10ebcd81" UNIQUE ("positionId"), CONSTRAINT "PK_356a9237bd57751637093274e6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "close_price" ADD CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "close_price" DROP CONSTRAINT "FK_a0cd0feeb8433db5de10ebcd816"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`DROP TABLE "close_price"`);
  }
}
