const mysql = require('mysql');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = {

    index: async (req, res) => {
        let pokenuxtdb = {};

        pokenuxtdb.all = () => {
            return new Promise ((resolve, reject) => {
                pool.query('SELECT * FROM users', (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(results);
                });
            });
        };

        res.json (await pokenuxtdb.all());
    },

    create: async (req, res) => {
        const { username, email, password } = req.body;

        let pokenuxtdb = {};

        pokenuxtdb.create = (userData) => {
            return new Promise((resolve, reject) => {
                pool.query('INSERT INTO pokenuxt.users SET ?', userData, (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(results);
                });
            });
        };

        const userData = { username, email, password };

        const result = await pokenuxtdb.create(userData);

        res.json(result);
    }

}