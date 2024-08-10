const cron = require("node-cron");
const readExcelFile = require("./readfile");

cron.schedule("* * * * *", () => {
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
