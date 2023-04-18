import { SEED_PASSWORD } from '@app/config';
import { PassThrough } from 'stream';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags(name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('user 1', 'user1@email.com', '${SEED_PASSWORD}')`,
    );
    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('nest-seed-tutorial', 'How to seed Nest JS', 'Not that hard', 'Wont teach you lol','nestjs', 1)`,
    );
  }

  public async down(): Promise<void> {
    PassThrough;
  }
}
