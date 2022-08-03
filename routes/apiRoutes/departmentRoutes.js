const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;

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

// get a single department
router.get('/departments/:id', (req, res) => {
    const sql = `SELECT * FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Success!', data: row });
    });
});

router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ message: 'Success!', data: body });
    });
});

module.exports = router;