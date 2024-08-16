const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { PrismaClientValidationError } = require('@prisma/client/runtime/library');



// Get all products with optional filtering
// Get all products with optional filtering and pagination
router.get('/', async (req, res) => {
    const { sub_category_id, max_price, min_price, category_id, search, page = 1, pageSize = 8 } = req.query;

    try {
        // Build the filter object dynamically based on query parameters
        const filter = {};

        if (sub_category_id) {
            filter.sub_category_id = Number(sub_category_id);
        }
        if (category_id) {
            filter.category_id = Number(category_id);
        }
        if (min_price || max_price) {
            filter.price = {};
            if (min_price) {
                filter.price.gte = parseFloat(min_price);
            }
            if (max_price) {
                filter.price.lte = parseFloat(max_price);
            }
        }

        // Implement search functionality
        const searchFilter = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { desc: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const skip = (page - 1) * pageSize;
        const take = parseInt(pageSize);

        const products = await prisma.product.findMany({
            where: {
                ...filter,
                ...searchFilter
            },
            skip,
            take,
        });

        const totalProducts = await prisma.product.count({
            where: {
                ...filter,
                ...searchFilter
            }
        });

        res.status(200).json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / pageSize),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


// Add a new product
// router.post('/add', async (req, res) => {
//     const { name, desc, SKU, category_id, sub_category_id, inventory_id, price, discount_id, images } = req.body;
//     try {
//         const product = await prisma.product.create({
//             data: {
//                 name,
//                 desc,
//                 SKU,
//                 category_id,
//                 sub_category_id,
//                 inventory_id,
//                 price,
//                 discount_id,
//                 images,
//             },
//         });
//         res.status(201).json(product);
//     } catch (error) {
//         if (error instanceof PrismaClientValidationError) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(500).json({ error: 'Failed to create product' });
//         }
//     }
// });




// Add a new product
router.post('/add', async (req, res) => {
    const { name, desc, SKU, category_id, sub_category_id, inventory_id, price, discount_id, images } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name,
                desc,
                SKU,
                category_id: Number(category_id),
                sub_category_id: sub_category_id ? Number(sub_category_id) : null,
                inventory_id: Number(inventory_id),
                price: parseFloat(price),
                discount_id: discount_id ? Number(discount_id) : null,
                images, // images should already be an array
            },
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error); // Log the full error
        if (error instanceof PrismaClientValidationError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to create product', details: error.message });
        }
    }
});


// Get a product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, desc, SKU, category_id, sub_category_id, inventory_id, price, discount_id, images } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                desc,
                SKU,
                category_id,
                sub_category_id,
                inventory_id,
                price,
                discount_id,
                images,
                modified_at: new Date(), // Updated field
            },
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
