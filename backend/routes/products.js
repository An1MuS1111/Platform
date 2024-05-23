// server.js
const pool = require('../db');
const router = require('express').Router();



// Get all products
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new product
router.post('/add', async (req, res) => {
    const { product_name, product_type, product_cost_subtotal, product_description, product_photos, product_creation_date, product_creation_time, product_availability_status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (product_name, product_type, product_cost_subtotal, product_description, product_photos, product_creation_date, product_creation_time, product_availability_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [product_name, product_type, product_cost_subtotal, product_description, product_photos, product_creation_date, product_creation_time, product_availability_status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { product_name, product_type, product_cost_subtotal, product_description, product_photos, product_creation_date, product_creation_time, product_availability_status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET product_name = $1, product_type = $2, product_cost_subtotal = $3, product_description = $4, product_photos = $5, product_creation_date = $6, product_creation_time = $7, product_availability_status = $8 WHERE product_id = $9 RETURNING *',
            [product_name, product_type, product_cost_subtotal, product_description, product_photos, product_creation_date, product_creation_time, product_availability_status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router