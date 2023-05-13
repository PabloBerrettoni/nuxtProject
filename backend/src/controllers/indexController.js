const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                    };

                    return resolve(results);
                });
            });
        };

        res.json (await pokenuxtdb.all());
    },

    create: async (req, res) => {
        const { username, email, password } = req.body;

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = { username, email, password: hashedPassword };

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

        const result = await pokenuxtdb.create(userData);

        res.json(result);
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        let pokenuxtdb = {};

        pokenuxtdb.getUserByEmail = (email) => {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if (err) {
                        return reject(err);
                    }
                    connection.query('SELECT * FROM pokenuxt.users WHERE email = ?', email, (err, results) => {
                        connection.release();
                        if (err) {
                            return reject(err);
                        };
                        return resolve(results[0]);
                    });
                });
            });
        };

        const user = await pokenuxtdb.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '999h' });

        // Get user's favorite pokemons
        const pokenuxtdb2 = {};
        pokenuxtdb2.all = (data) => {
            return new Promise ((resolve, reject) => {
                pool.query('SELECT pokename FROM pokefavs WHERE user = ?', [data.user], (err, results) => {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(results);
                });
            });
        };
        const pokeFavs = await pokenuxtdb2.all({ user: user.id });

        res.json({ userId: user.id, token, pokeFavs });
    },

    userData: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; // get token from headers
            const userId = req.body.userId;
    
            if (!token) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // decode and verify token
    
            if (!decodedToken) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            const { email } = req.body;
            let pokenuxtdb = {};
    
            pokenuxtdb.getUserByEmail = (email) => {
                return new Promise((resolve, reject) => {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return reject(err);
                        }
                        connection.query('SELECT * FROM pokenuxt.users WHERE id = ?', userId, (err, results) => {
                            connection.release();
                            if (err) {
                                return reject(err);
                            };
                            return resolve(results[0]);
                        });
                    });
                });
            };
    
            const user = await pokenuxtdb.getUserByEmail(email);
    
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            res.send(user);
        } catch (e) {
            return res.status(401).send({message: 'unauthenticated'});
        }
    },

    addPokeFav: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];  // get token from headers
            const reqUserId = req.body.userId;
            const pokemonName = req.body.pokeName;

            if (!token) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // decode and verify token
    
            if (!decodedToken) {
                return res.status(401).send({message: 'unauthenticated'});
            };

            const favPokeData = { pokeName: pokemonName, user: reqUserId };

            let pokenuxtdb = {};
            pokenuxtdb.create = (data) => {
                return new Promise((resolve, reject) => {
                    pool.query('INSERT INTO pokenuxt.pokefavs SET ?', data, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results);
                    });
                });
            };

            const result = await pokenuxtdb.create(favPokeData);

            res.json(result);
        } catch (e) {
            return res.status(401).send({message: 'error'});
        };

    },

    deletePokeFav: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];  // get token from headers
            const reqUserId = req.body.userId;
            const pokemonName = req.body.pokeName;
    
            if (!token) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // decode and verify token
    
            if (!decodedToken) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            let pokenuxtdb = {};
            pokenuxtdb.delete = (data) => {
                return new Promise((resolve, reject) => {
                    pool.query('DELETE FROM pokenuxt.pokefavs WHERE pokeName = ? AND user = ?', [data.pokeName, data.user], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results);
                    });
                });
            };
    
            const result = await pokenuxtdb.delete({ pokeName: pokemonName, user: reqUserId });
    
            res.json(result);
        } catch (e) {
            return res.status(401).send({message: 'error'});
        };
    },

    indexPokeFav: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];  // get token from headers
            const reqUserId = req.body.userId;
    
            if (!token) {
                return res.status(401).send({message: 'unauthenticated'});
            };
    
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // decode and verify token
    
            if (!decodedToken) {
                return res.status(401).send({message: 'unauthenticated'});
            };

            let pokenuxtdb = {};
            pokenuxtdb.all = (data) => {
                return new Promise ((resolve, reject) => {
                    pool.query('SELECT pokename FROM pokefavs WHERE user = ?', [data.user], (err, results) => {
                        if (err) {
                            return reject(err);
                        };
    
                        return resolve(results);
                    });
                });
            };
    
            res.json (await pokenuxtdb.all({user: reqUserId}));
        } catch (e) {
            return res.status(401).send({message: 'error'});
        };
    }
}