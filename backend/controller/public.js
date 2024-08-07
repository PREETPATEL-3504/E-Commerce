const con = require("../db");

const payment = (req, res) => {
  const id = req.body.payload.payment.entity.order_id;
  const query = "SELECT orderId FROM orders WHERE orderid = ?";
  con.query(query, [id], function (req, res) {
    if (res) {
      const query =
        "UPDATE orders SET paymentStatus = 'Success' WHERE orderId =?";
      con.query(query, [id], function (err, result) {
        if (err) {
          console.error("Error updating payment status", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
    }
  });
};
module.exports = payment;
