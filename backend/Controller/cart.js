const { INSERT } = require("sequelize/lib/query-types");
const con = require("../db");
const Cart = require("../Model/Cart");

const AddtoCart = async (req, res) => {
  const { AdminId, description, id, image_url, name, price, quantity } =
    req.body;
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updatedAt = createdAt;
  const query =
    "INSERT INTO Cart (userId, admin_id, description, id, image_url, name, price, quantity) VALUES (?,?,?,?,?,?,?,?)";
    con.query(
      query,
      [req.user.id, AdminId, description, id, image_url, name, price, quantity],
      function (err, result) {
        if (err) {
          console.error("Error adding to cart:", err);
          res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: null,
          });
          return;
        }
        console.log("Product added to cart successfully", result);
        res.status(200).json({
          status: 200,
          message: "Product added to cart successfully",
          data: result,
        });
      })
};

module.exports = AddtoCart;