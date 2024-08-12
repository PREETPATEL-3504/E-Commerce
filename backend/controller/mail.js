const con = require("../db");

const failedPayment = async (req, res) => {
    
  const query = "SELECT * FROM orders INNER JOIN users ON orders.userID = users.id WHERE paymentStatus = ? ";
  con.query(query, ["Failed"], function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
};

module.exports = { failedPayment };
