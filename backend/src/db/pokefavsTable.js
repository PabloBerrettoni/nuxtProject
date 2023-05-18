const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

let pokeFavsTable = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`USE ${process.env.DB_NAME}`);
        const [rows] = await connection.query('SHOW TABLES LIKE "pokefavs"');

        if (rows.length === 0) {
            await connection.query(`
                CREATE TABLE pokefavs (
                    PK INT NOT NULL AUTO_INCREMENT,
                    pokeName VARCHAR(255) NOT NULL,
                    user INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (PK),
                    FOREIGN KEY (user) REFERENCES users (id)
                )
            `);
            console.log('Table created');
        } else {
            const [fields] = await connection.query('DESCRIBE pokefavs');
            const expectedFields = [
                { Field: 'PK', Type: 'int(11)', Null: 'NO', Key: 'PRI', Default: null, Extra: 'auto_increment' },
                { Field: 'pokeName', Type: 'varchar(255)', Null: 'NO', Key: '', Default: null, Extra: '' },
                { Field: 'user', Type: 'int(11)', Null: 'NO', Key: 'MUL', Default: null, Extra: '' },
                { Field: 'created_at', Type: 'timestamp', Null: 'NO', Key: '', Default: 'CURRENT_TIMESTAMP', Extra: '' }
            ];

            const missingFields = expectedFields.filter(expected => {
                return !fields.some(field => field.Field === expected.Field);
            });

            const extraFields = fields.filter(field => {
                return !expectedFields.some(expected => expected.Field === field.Field);
            });

            if (missingFields.length > 0) {
                await connection.query(`ALTER TABLE pokefavs ${missingFields.map(field => `ADD COLUMN ${field.Field} ${field.Type} ${field.Null === 'YES' ? 'NULL' : 'NOT NULL'} ${field.Default ? `DEFAULT ${field.Default}` : ''}`).join(', ')}`);
                console.log('Table updated: added fields');
            }

            if (extraFields.length > 0) {
                await Promise.all(extraFields.map(field => connection.query(`ALTER TABLE pokefavs DROP COLUMN ${field.Field}`)));
                console.log('Table updated: removed fields');
            }
        }

        connection.release();
    } catch (err) {
        console.error('Error creating table:', err.message);
    }
};

module.exports = {
    pokeFavsTable
};