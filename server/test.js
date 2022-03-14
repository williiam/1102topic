import { pool,sequelize } from './postgres.js'

const res = await pool.query('SELECT NOW()')
console.log(res)
await pool.end()

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}