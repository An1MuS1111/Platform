const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { PrismaClientValidationError } = require('@prisma/client/runtime/library');

// Get all product subcategories
router.get('/', async (req, res) => {
    try {
        const subCategories = await prisma.productSubCategory.findMany();
        res.status(200).json(subCategories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product subcategories' });
    }
});

// Add a new product subcategory
router.post('/add', async (req, res) => {
    const { name, desc, category_id } = req.body;
    try {
        const subCategory = await prisma.productSubCategory.create({
            data: {
                name,
                desc,
                category_id: Number(category_id),
            },
        });
        res.status(201).json(subCategory);
    } catch (error) {
        if (error instanceof PrismaClientValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create product subcategory' });
        }
    }
});

// Get a product subcategory by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const subCategory = await prisma.productSubCategory.findUnique({
            where: { id: Number(id) },
        });
        if (subCategory) {
            res.status(200).json(subCategory);
        } else {
            res.status(404).json({ error: 'Product subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product subcategory' });
    }
});

// Update a product subcategory by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc, category_id } = req.body;
    try {
        const subCategory = await prisma.productSubCategory.update({
            where: { id: Number(id) },
            data: {
                name,
                desc,
                category_id: Number(category_id),
                modified_at: new Date(), // Updated field
            },
        });
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product subcategory' });
    }
});

// Delete a product subcategory by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productSubCategory.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product subcategory' });
    }
});

module.exports = router;
