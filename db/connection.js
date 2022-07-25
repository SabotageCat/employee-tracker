const mysql = require('mysql2');

// connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Xo6iklV5zdIJ8eSk',
        database: 'employees'
    },
    console.log('Connected to the employees database!')
);

module.exports = db;