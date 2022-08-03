const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return
        }
        
        res.status(200).json({
            message: 'Success!',
            data: rows
        });
    });
});

router.post('/roles', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'Success!', data: body });
    });
});

module.exports = router;