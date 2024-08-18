const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');
// const { DatabaseConnection } = require('./routes/auths')
app.use(cors());
app.use(express.json());





// import routes
const usersRouter = require('./routes/users')
const uploadsRouter = require('./routes/uploads')
const productsRouter = require('./routes/products')
const productCategoriesRouter = require('./routes/productCategories');
const productSubCategoriesRouter = require('./routes/productSubCategories');
const discountsRouter = require('./routes/discounts');
const productInventoriesRouter = require('./routes/productInventories');
const authsRouter = require('./routes/auths.js');


// use routes
app.use('/users', usersRouter)
app.use('/uploads', uploadsRouter)
app.use('/products', productsRouter)
app.use('/productcategories', productCategoriesRouter);
app.use('/productsubCategories', productSubCategoriesRouter);
app.use('/discounts', discountsRouter);
app.use('/productinventories', productInventoriesRouter);
app.use('/auths', authsRouter);



// Serve files from the 'uploads' directory
// serve static files to access it from the frontend
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



// DatabaseConnection();
authsRouter.DatabaseConnection();

// set up server
PORT = 4444
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})