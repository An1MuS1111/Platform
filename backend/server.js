const express = require('express')
const cors = require('cors')


const app = express()



require('dotenv').config();


app.use(cors());
app.use(express.json());


const employeesRouter = require('./routes/employees')

app.use('/employees', employeesRouter)


PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})