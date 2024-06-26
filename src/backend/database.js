
import knex from 'knex';
import 'dotenv/config';

// create connection
const myKnex = knex({
  client: "postgres",
  // client: process.env.DB_CLIENT || "postgres",
  // client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
});

// Check that the connection works

myKnex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});

export default myKnex;

