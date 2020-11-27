import {MigrationInterface, QueryRunner} from 'typeorm';

export class Position1606509011244 implements MigrationInterface {
  name = 'Position1606509011244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "position_state_enum" AS ENUM('open', 'closed', 'deleted')`,
    );
    await queryRunner.query(
      `CREATE TYPE "position_type_enum" AS ENUM('sell', 'buy')`,
    );
    await queryRunner.query(
      `CREATE TABLE "position" ("id" SERIAL NOT NULL, "amount" numeric(19,4) NOT NULL, "price" numeric(19,4) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'EUR', "commission" money NOT NULL DEFAULT '0', "state" "position_state_enum" NOT NULL DEFAULT 'open', "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" "position_type_enum" NOT NULL DEFAULT 'buy', "instrumentId" integer, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "position" ADD CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a" FOREIGN KEY ("instrumentId") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "position" DROP CONSTRAINT "FK_7402d4193fda9bb0bfab57e7c1a"`,
    );
    await queryRunner.query(`DROP TABLE "position"`);
    await queryRunner.query(`DROP TYPE "position_type_enum"`);
    await queryRunner.query(`DROP TYPE "position_state_enum"`);
  }
}
