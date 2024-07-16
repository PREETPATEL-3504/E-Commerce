const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const upload = require("./Controller/multerConfig");
const app = express();
app.use(bodyParser.json())


const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOption))

// Routes
const router = require("./Routes/User");
app.use('/api', router);

const Product = require('./Routes/Product');
app.use('/api', Product);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

