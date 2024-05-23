const { Pool } = require('pg');


require('dotenv').config()


const pool = new Pool({
    user: process.env.USER,
    password: process.env.USER,
    host: 'localhost',
    port: 5432, // default Postgres port
    database: process.env.DATABASE
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};