const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { PrismaClientValidationError } = require('@prisma/client/runtime/library');

// Get all product categories
router.get('/', async (req, res) => {
    try {
        const categories = await prisma.productCategory.findMany();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product categories' });
    }
});

// Add a new product category
router.post('/add', async (req, res) => {
    const { name, desc } = req.body;
    try {
        const category = await prisma.productCategory.create({
            data: {
                name,
                desc,
            },
        });
        res.status(201).json(category);
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create product category' });
        }
    }
});

// Get a product category by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.productCategory.findUnique({
            where: { id: Number(id) },
        });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Product category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product category' });
    }
});

// Update a product category by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc } = req.body;
    try {
        const category = await prisma.productCategory.update({
            where: { id: Number(id) },
            data: {
                name,
                desc,
                modified_at: new Date(), // Updated field
            },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product category' });
    }
});

// Delete a product category by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productCategory.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product category' });
    }
});

module.exports = router;
