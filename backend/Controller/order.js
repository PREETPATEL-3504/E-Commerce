const { cloneDeep } = require("sequelize/lib/utils");
const con = require("../db");
const Order = require("../Model/order");

const orderAdd = async (req, res) => {
  try {
    const UserId = req.params.id;
    const { ProductId, quantity, price, AdminId, name } = req.body;
    const query =
      "INSERT INTO orders (userId, productId, quantity, price, adminid, name) VALUES (?,?,?,?,?,?)";
    con.query(
      query,
      [UserId, ProductId, quantity, price, AdminId, name],
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
  const query = "SELECT * FROM orders WHERE adminId = ?";
  con.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

const userOrder = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM orders WHERE userId = ?";
  con.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

const orderAccept = (req, res) => {
  const orderId = req.params.id;
  const query = "UPDATE orders SET status = 'accepted' WHERE id =?";
  con.query(query, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Order accepted successfully" });
  });
};

const orderReject = (req, res) => {
  const orderId = req.params.id;
  const query = "UPDATE orders SET status ='rejected' WHERE id =?";
  con.query(query, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Order rejected successfully" });
  });
};
module.exports = { orderGet, orderAdd, orderAccept, orderReject, userOrder };
