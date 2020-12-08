let partial = {};

if (process.env.DATABASE_URL) {
  partial = {
    url: process.env.DATABASE_URL,
  };
} else {
  partial = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'investory',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
  };
}

module.exports = {
  type: 'postgres',
  ...partial,
  synchronize: false,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
