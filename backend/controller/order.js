const { io } = require("../socket");
const con = require("../db");
const crypto = require("crypto");
const instance = require("../payment");

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
        const data = {
          productId: ProductId,
          quantity: quantity,
          price: price,
          name: name,
          status: "Pending",
        };
        io.emit("orderAdd", data);

        //Payment
        try {
          const options = {
            amount: 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
          };
          instance.orders.create(options, function (err, order) {
            console.log(
              "=================== Order ======================",
              order
            );
            res
              .status(200)
              .json({ message: "Order id created successfully", order: order });
          });
        } catch (error) {
          console.log("***************", error);
          res.status(500).json({ message: "Internal Server Error!" });
        }
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
  const query = "UPDATE orders SET status = 'Accepted' WHERE id =?";
  con.query(query, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);
    io.emit("orderAccept", orderId);
    res.status(200).json({ message: "Order accepted successfully" });
  });
};

const orderReject = (req, res) => {
  const orderId = req.params.id;
  const query = "UPDATE orders SET status ='Rejected' WHERE id =?";
  con.query(query, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);
    io.emit("orderReject", orderId);
    res.status(200).json({ message: "Order rejected successfully" });
  });
};
module.exports = { orderGet, orderAdd, orderAccept, orderReject, userOrder };
