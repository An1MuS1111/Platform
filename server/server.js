const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');
// const { DatabaseConnection } = require('./routes/auths')
app.use(cors());
app.use(express.json());




// DatabaseConnection();

// import routes
const usersRouter = require('./routes/users')
const uploadsRouter = require('./routes/uploads')
const productsRouter = require('./routes/products')
const productCategoriesRouter = require('./routes/productCategories');
const productSubCategoriesRouter = require('./routes/productSubCategories');


// use routes
app.use('/users', usersRouter)
app.use('/uploads', uploadsRouter)
app.use('/products', productsRouter)
app.use('/productcategories', productCategoriesRouter);
app.use('/productsubCategories', productSubCategoriesRouter);



// Serve files from the 'uploads' directory
// serve static files to access it from the frontend
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




// set up server
PORT = 4444
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})