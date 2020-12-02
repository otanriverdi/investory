module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME || 'investory',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
