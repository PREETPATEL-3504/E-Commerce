const { io } = require("../socket");
const con = require("../db");
const crypto = require("crypto");
const instance = require("../payment");
const order = require("../model/order");
const mail = require("../services/mail");

const orderAdd = async (req, res) => {
  try {
    const UserId = req.params.id;
    const { ProductId, quantity, price, AdminId, name, image_url } = req.body;

    try {
      const options = {
        amount: price,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
      instance.orders.create(options, function (err, order) {
        res.status(200).json({ order: order });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }

    // const orderId = order.id;
    // const query =
    //   "INSERT INTO orders (userId, productId, quantity, price, adminid, name, orderId, paymentStatus, image) VALUES (?,?,?,?,?,?,?,?, ?)";
    // con.query(
    //   query,
    //   [
    //     UserId,
    //     ProductId,
    //     quantity,
    //     price,
    //     AdminId,
    //     name,
    //     orderId,
    //     "Pending",
    //     image_url,
    //   ],
    //   (err, result) => {
    //     if (err) throw err;
    //     const data = {
    //       productId: ProductId,
    //       quantity: quantity,
    //       price: price,
    //       name: name,
    //       orderId: orderId,
    //       status: "Pending",
    //     };
    //     io.emit("orderAdd", data);
    //   }
    // );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding order" });
  }
};

const orderGet = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM orders WHERE adminId = ? AND paymentStatus = ?";
  con.query(query, [userId, "Success"], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

const userOrder = (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM orders WHERE userId = ? AND paymentStatus = ?";
  con.query(query, [userId, "Success"], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

const orderAccept = (req, res) => {
  const orderId = req.params.id;
  const query = "UPDATE orders SET status = 'Accepted' WHERE id =?";
  con.query(query, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);
    io.emit("orderAccept", orderId);
    res.status(200).json({ message: "Order accepted successfully" });
  });
};

const orderReject = (req, res) => {
  const { id } = req.params;
  const { reason, body, role } = req.body;
  const que = "SELECT userId, adminId FROM orders WHERE id = ?";

  con.query(que, [id], (err, result) => {
    if (err) throw err;

    const userId = result[0].userId;
    const adminId = result[0].adminId;

    if (role === "admin") {
      const query = "SELECT email FROM users WHERE id = ?";
      con.query(query, [userId], (err, result) => {
        if (err) throw err;
        const emailTo = result[0].email;
        mail(emailTo, reason, body);
        const query = "UPDATE orders SET status ='Rejected' WHERE id = ?";
        con.query(query, [id], (err, result) => {
          if (err) return res.status(500).json(err);
          io.emit("orderReject", id);
          res.status(200).json({ message: "Order rejected successfully" });
        });
      });
    } else {
      const query = "SELECT email FROM users WHERE id = ?";
      con.query(query, [adminId], (err, result) => {
        if (err) throw err;
        const emailTo = result[0].email;
        mail(emailTo, reason, body);
        const query = "UPDATE orders SET status ='Cancelled' WHERE id = ?";
        con.query(query, [id], (err, result) => {
          if (err) return res.status(500).json(err);
          io.emit("orderCancel", id);
          res.status(200).json({ message: "Order rejected successfully" });
        });
      });
    }
  });
};

module.exports = { orderGet, orderAdd, orderAccept, orderReject, userOrder };
