const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const { app, server } = require("./socket");
const router = require("./routes/index");
require("dotenv").config();

const corsOption = {
  origin: `${process.env.REACT_API}`,
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOption));

//Image fetching
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/", router);

server.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
