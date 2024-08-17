const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all product inventories
router.get('/', async (req, res) => {
    try {
        const inventories = await prisma.productInventory.findMany();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product inventories' });
    }
});

// Add a new product inventory
router.post('/add', async (req, res) => {
    const { quantity, products } = req.body;
    try {
        const inventory = await prisma.productInventory.create({
            data: {
                quantity,
                products: {
                    connect: products.map((productId) => ({ id: productId })),
                },
            },
        });
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product inventory' });
    }
});

// Get a product inventory by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const inventory = await prisma.productInventory.findUnique({
            where: { id: Number(id) },
            include: { products: true },
        });
        if (inventory) {
            res.status(200).json(inventory);
        } else {
            res.status(404).json({ error: 'Product inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product inventory' });
    }
});

// Update a product inventory by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity, products } = req.body;
    try {
        const inventory = await prisma.productInventory.update({
            where: { id: Number(id) },
            data: {
                quantity,
                products: {
                    set: products.map((productId) => ({ id: productId })),
                },
                modified_at: new Date(),
            },
        });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product inventory' });
    }
});

// Delete a product inventory by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.productInventory.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product inventory' });
    }
});

module.exports = router;
