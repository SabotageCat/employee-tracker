const mysql = require('mysql2');

// connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Xo6iklV5zdIJ8eSk',
        database: 'workplace'
    },
    console.log('Connected to the workplace database!')
);

module.exports = db;