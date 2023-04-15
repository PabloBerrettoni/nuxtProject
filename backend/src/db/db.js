const mysql = require('mysql2/promise');
const usersTable = require('./usersTable.js');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

async function createDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.query('CREATE DATABASE IF NOT EXISTS pokenuxt');
        connection.release();
        console.log('Database created or already exists');
    } catch (err) {
        console.error('Error creating database:', err.message);
    }
}

const initializeDatabase = async () => {
    try {
        await createDatabase();
        await usersTable.usersTable();
    } catch (err) {
        console.error('Error initializing database:', err.message);
    }
};

module.exports = {
    pool,
    initializeDatabase
};
