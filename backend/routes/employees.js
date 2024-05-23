

const pool = require('../db');
const router = require('express').Router();

// Get all employees
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new employee
router.post('/add', async (req, res) => {
    const { first_name, last_name, email, date_of_birth, hire_date, department } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO employees (first_name, last_name, email, date_of_birth, hire_date, department) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, email, date_of_birth, hire_date, department]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an employee by ID
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { first_name, last_name, email, date_of_birth, hire_date, department } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET first_name = $1, last_name = $2, email = $3, date_of_birth = $4, hire_date = $5, department = $6 WHERE employee_id = $7 RETURNING *',
            [first_name, last_name, email, date_of_birth, hire_date, department, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;