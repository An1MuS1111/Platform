const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all discounts
router.get('/', async (req, res) => {
    try {
        const discounts = await prisma.discount.findMany();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discounts' });
    }
});

// Add a new discount
router.post('/add', async (req, res) => {
    const { name, desc, discount_percent, active, products } = req.body;
    try {
        const discount = await prisma.discount.create({
            data: {
                name,
                desc,
                discount_percent,
                active,
                products: {
                    connect: products.map((productId) => ({ id: productId })),
                },
            },
        });
        res.status(201).json(discount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create discount' });
    }
});

// Get a discount by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const discount = await prisma.discount.findUnique({
            where: { id: Number(id) },
            include: { products: true },
        });
        if (discount) {
            res.status(200).json(discount);
        } else {
            res.status(404).json({ error: 'Discount not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discount' });
    }
});

// Update a discount by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc, discount_percent, active, products } = req.body;
    try {
        const discount = await prisma.discount.update({
            where: { id: Number(id) },
            data: {
                name,
                desc,
                discount_percent,
                active,
                products: {
                    set: products.map((productId) => ({ id: productId })),
                },
                modified_at: new Date(),
            },
        });
        res.status(200).json(discount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update discount' });
    }
});

// Delete a discount by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.discount.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete discount' });
    }
});

module.exports = router;
