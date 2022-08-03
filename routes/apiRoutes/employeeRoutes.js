const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employee`;

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

router.post('/employees', (req, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES (?,?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.department_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Success!', data: body });
    });
});
