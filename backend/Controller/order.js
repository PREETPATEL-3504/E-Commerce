const con = require("../db");
const Order = require("../Model/order");

const orderAdd = async (req, res) => {
  try {
    const UserId = req.params.id;
    const { ProductId, quantity, price, AdminId } = req.body;
    const query =
      "INSERT INTO orders (userId, productId, quantity, price, adminid) VALUES (?,?,?,?,?)";
    con.query(
      query,
      [UserId, ProductId, quantity, price, AdminId],
      (err, result) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: "Order added successfully", data: result });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding order" });
  }
};

const orderGet = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM Order WHERE AdminId = ?";
  con.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ data: result });
  });
};

module.exports = { orderGet, orderAdd };
