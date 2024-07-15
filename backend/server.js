const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())


const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOption))

// Routes
const addProduct = require('./Routes/Product');
app.use('/api', addProduct);

const GetProduct = require('./Routes/Product');
app.use('/api', GetProduct);

const deleteProduct = require('./Routes/Product');
app.use('/api', deleteProduct);

const updateProduct = require('./Routes/Product');
app.use('/api', updateProduct);

const getProductbyid = require('./Routes/Product');
app.use('/api', getProductbyid);

const userRegister = require('./Routes/User')
app.use('/api', userRegister);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

