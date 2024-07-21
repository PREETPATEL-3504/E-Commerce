const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const { app, server } = require("./socket");

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOption));

//Image fetching
app.use("/images", express.static(path.join(__dirname, "Images")));

// Routes
const router = require("./Routes/index");
app.use("/", router);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
