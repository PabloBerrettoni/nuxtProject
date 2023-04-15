const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

let usersTable = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query('USE pokenuxt');
        const [rows] = await connection.query('SHOW TABLES LIKE "users"');

        if (rows.length === 0) {
            await connection.query(`
                CREATE TABLE users (
                    id INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id)
                )
            `);
            console.log('Table created');
        } else {
            const [fields] = await connection.query('DESCRIBE users');
            const expectedFields = [
                { Field: 'id', Type: 'int(11)', Null: 'NO', Key: 'PRI', Default: null, Extra: 'auto_increment' },
                { Field: 'email', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null, Extra: '' },
                { Field: 'username', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null, Extra: '' },
                { Field: 'password', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null, Extra: '' },
                { Field: 'created_at', Type: 'timestamp', Null: 'NO', Key: '', Default: 'CURRENT_TIMESTAMP', Extra: '' }
            ];

            const missingFields = expectedFields.filter(expected => {
                return !fields.some(field => field.Field === expected.Field);
            });

            const extraFields = fields.filter(field => {
                return !expectedFields.some(expected => expected.Field === field.Field);
            });

            if (missingFields.length > 0) {
                await connection.query(`ALTER TABLE users ${missingFields.map(field => `ADD COLUMN ${field.Field} ${field.Type} ${field.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${field.Default ? `DEFAULT ${field.Default}` : ''}`).join(', ')}`);
                console.log('Table updated: added fields');
            }

            if (extraFields.length > 0) {
                await Promise.all(extraFields.map(field => connection.query(`ALTER TABLE users DROP COLUMN ${field.Field}`)));
                console.log('Table updated: removed fields');
            }
        }

        connection.release();
    } catch (err) {
        console.error('Error creating table:', err.message);
    }
};

module.exports = {
    usersTable
};