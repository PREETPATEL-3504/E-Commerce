const axios  = require("axios");
const cron = require("node-cron");
const mail = require("../services/mail");

cron.schedule("0 0 0 * * *", async() => {
  const res = await axios.get("http://localhost:5000/mail")
  
  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].paymentStatus == "Failed") {
      const email = res.data[i].email
      const subject = "Your payment was failed!";
      const body = "Dear user your payment failed";
      mail(email, subject, body);
    }
  }
});
