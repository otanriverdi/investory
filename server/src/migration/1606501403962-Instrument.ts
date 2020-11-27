import {MigrationInterface, QueryRunner} from 'typeorm';

export class Instrument1606501403962 implements MigrationInterface {
  name = 'Instrument1606501403962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "instrument_type_enum" AS ENUM('crypto', 'fx', 'stock')`,
    );
    await queryRunner.query(
      `CREATE TABLE "instrument" ("id" SERIAL NOT NULL, "symbol" character varying NOT NULL, "name" character varying NOT NULL, "type" "instrument_type_enum" NOT NULL, CONSTRAINT "PK_1707dc7e7c2845211b38bef3d29" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "instrument"`);
    await queryRunner.query(`DROP TYPE "instrument_type_enum"`);
  }
}
