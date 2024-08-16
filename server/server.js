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

// use routes
app.use('/users', usersRouter)
app.use('/uploads', uploadsRouter)


// serve static files to access it from the frontend
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




// set up server
PORT = 4444
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})