const { io } = require("../socket");
const con = require("../db");
const crypto = require("crypto");
const instance = require("../payment");
const transporter = require("../services/mail");
const order = require("../model/order")

const orderAdd = async (req, res) => {
  try {
    const UserId = req.params.id;
    const { ProductId, quantity, price, AdminId, name } = req.body;


    try {
      const options = {
        amount: price,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
      instance.orders.create(options, function (err, order) {
        const orderId = order.id;
        const query =
          "INSERT INTO orders (userId, productId, quantity, price, adminid, name, orderId, paymentStatus) VALUES (?,?,?,?,?,?,?,?)";
        con.query(
          query,
          [UserId, ProductId, quantity, price, AdminId, name, orderId, "Pending"],
          (err, result) => {
            if (err) throw err;
            const data = {
              productId: ProductId,
              quantity: quantity,
              price: price,
              name: name,
              orderId: orderId,
              status: "Pending"
            };
            io.emit("orderAdd", data);
          }
        );
        res
          .status(200)
          .json({ message: "Order id created successfully", order: order });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
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
  const orderId = req.params.id;
  console.log("---->>>>", req.body.reason, req.body.comment );
  const subject = req.body.reason;
  const body = req.body.comment;
  const que = "SELECT userId FROM orders WHERE id = ?"

  con.query(que, [orderId], (err, result) => {
    if (err) throw err;
    const userId = result[0].userId;
    const query = "SELECT email FROM users WHERE id = ?"

    con.query(query, [userId], (err, result) => {
      if (err) throw err;
      const email = result[0].email;
      var mailOptions = {
        from: "skyllect.preet@gmail.com",
        to: email,
        subject: subject,
        text: body,
      };

      if (transporter) {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.json({ error: error });
          } else {
            const query = "UPDATE orders SET status ='Rejected' WHERE id = ?";
            con.query(query, [orderId], (err, result) => {
              if (err) return res.status(500).json(err);
              io.emit("orderReject", orderId);
              res.status(200).json({ message: "Order rejected successfully" });
            });
          }
        });
      } else {
        console.error("transporter is undefined");
      }
    });
  });


};

module.exports = { orderGet, orderAdd, orderAccept, orderReject, userOrder };
