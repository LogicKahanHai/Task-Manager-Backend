export const Env = {
  db: {
    type: 'DB_TYPE',
    host: 'DB_HOST',
    port: 'DB_PORT',
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
  },
  jwt: {
    access: {
      secret: 'JWT_ACCESS_SECRET',
      expire: 'JWT_ACCESS_EXPIRE',
    },
    refresh: {
      secret: 'JWT_REFRESH_SECRET',
      expire: 'JWT_REFRESH_EXPIRE',
    },
  },
};
