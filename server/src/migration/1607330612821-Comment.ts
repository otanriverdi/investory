import {MigrationInterface, QueryRunner} from 'typeorm';

export class Comment1607330612821 implements MigrationInterface {
  name = 'Comment1607330612821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "owner" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "body" character varying NOT NULL, "instrumentId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_de2da3629bd601f77045a9fce7f" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_de2da3629bd601f77045a9fce7f"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
