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