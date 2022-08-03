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

router.post('/employees', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, roles_id, department_id, manager_id) VALUES (?,?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.roles_id, body.department_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Success!', data: body });
    });
});

router.put('/employees/:id', ({ body }, res) => {
    const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
    const params = [body.roles_id, body.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.status(404).json({ message: 'Employee not found!' });
        } else {
            res.status(200).json({ message: 'Success!', data: body, changes: result.affectedRows });
        }
    });
});

router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.status(404).json({ message: 'Employee not found!' });
        } else {
            res.status(200).json({ message: 'Deleted employee!', changes: result.affectedRows, id: req.params.id });
        }
    });
});

module.exports = router;