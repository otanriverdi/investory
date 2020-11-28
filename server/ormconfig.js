module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'investory',
  username: process.env.DB_USER || null,
  password: process.env.DB_PASS || null,
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
