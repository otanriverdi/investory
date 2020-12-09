let partial = {};

if (process.env.DATABASE_URL) {
  partial = {
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
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
  entities: ['dist/entity/*.js'],
  migrations: ['dist/migration/*.js'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'dist/migration',
  },
};
