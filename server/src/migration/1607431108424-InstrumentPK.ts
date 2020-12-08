import {MigrationInterface, QueryRunner} from 'typeorm';

export class InstrumentPK1607431108424 implements MigrationInterface {
  name = 'InstrumentPK1607431108424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_de2da3629bd601f77045a9fce7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" RENAME COLUMN "instrumentId" TO "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "instrumentId" TO "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instrument" DROP CONSTRAINT "PK_1707dc7e7c2845211b38bef3d29"`,
    );
    await queryRunner.query(`ALTER TABLE "instrument" DROP COLUMN "id"`);
    await queryRunner.query(`COMMENT ON COLUMN "instrument"."symbol" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "instrument" ADD CONSTRAINT "PK_4723ba323c4fde81afada019b5d" PRIMARY KEY ("symbol")`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "position" DROP COLUMN "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD "instrumentSymbol" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP COLUMN "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "instrumentSymbol" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_6d9f5bf5c2da8ed091e9fa52764" FOREIGN KEY ("instrumentSymbol") REFERENCES "instrument"("symbol") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_b2ab11b5ac8884c9e7878d0b78b" FOREIGN KEY ("instrumentSymbol") REFERENCES "instrument"("symbol") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_b2ab11b5ac8884c9e7878d0b78b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_6d9f5bf5c2da8ed091e9fa52764"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP COLUMN "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "instrumentSymbol" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" DROP COLUMN "instrumentSymbol"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD "instrumentSymbol" integer`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "position"."date" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "instrument" DROP CONSTRAINT "PK_4723ba323c4fde81afada019b5d"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "instrument"."symbol" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "instrument" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "instrument" ADD CONSTRAINT "PK_1707dc7e7c2845211b38bef3d29" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "instrumentSymbol" TO "instrumentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" RENAME COLUMN "instrumentSymbol" TO "instrumentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_de2da3629bd601f77045a9fce7f" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
