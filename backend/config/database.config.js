// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' });

console.log('DB Host:', process.env.DB_HOST);
console.log('DB Dialect:', process.env.DB_DIALECT);

module.exports = {
  dialect: 'postgres', // Forzamos el dialecto
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
};
