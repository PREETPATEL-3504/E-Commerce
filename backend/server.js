const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require("body-parser");
const path = require("path");
const { app, server } = require("./socket");
const cron = require("node-cron");
const router = require("./routes/index");
const XLSX = require("xlsx");
const mail = require("./services/mail");
const readExcelFile = require("./services/readfile");

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOption));

//Image fetching
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/", router);

// Schedule the task
cron.schedule("0 0 * * *", () => {
  const data = readExcelFile(
    "/home/admin1/Documents/Preet/E-Commerce/E-Commerce/backend/data.xlsx"
  );
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == "failed") {
      const subject = "Your payment was failed!";
      const body = "Dear user your payment failed";
      mail(data[i].email, subject, body);
    }
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
