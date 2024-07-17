const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const upload = require("./Controller/multerConfig");
const path = require('path');
const app = express();
app.use(bodyParser.json())


const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOption))

//Image fetching
app.use('/images', express.static(path.join(__dirname, 'Images')));

// Routes
const router = require("./Routes/index");
app.use('/', router);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

