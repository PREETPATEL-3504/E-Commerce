const { INSERT, DELETE } = require("sequelize/lib/query-types");
const con = require("../db");
const carts = require("../Model/Cart");

const AddtoCart = async (req, res) => {
  const { AdminId, description, image_url, name, price } = req.body;

  const ProductId = req.body.id;
  const UserId = req.query.UserId;
  const quantity = 1;
  const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updatedAt = createdAt;

  const productCheck = "SELECT * FROM carts WHERE userId = ? AND ProductId = ?";

  con.query(productCheck, [UserId, ProductId], async (checkErr, result) => {
    if (checkErr) {
      console.error("Error checking cart:", checkErr);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
      });
      return;
    }

    if (result.length > 0) {
      const existingItem = result[0];
      const updateQuantity = existingItem.quantity + 1;

      const updateQuery =
        "UPDATE carts SET quantity = ?, updatedAt = ? WHERE id = ?";

      con.query(
        updateQuery,
        [updateQuantity, updatedAt, existingItem.id],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating quantity:", updateErr);
            res.status(500).json({
              status: 500,
              message: "Internal Server Error",
              data: null,
            });
            return;
          }
          console.log("Product quantity updated successfully", updateResult);
          res.status(200).json({
            status: 200,
            message: "Product quantity updated successfully",
            data: updateResult,
          });
        }
      );
    } else {
      const query =
        "INSERT INTO carts (userId, AdminId, description, ProductId, image_url, name, price, quantity,createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?)";
      con.query(
        query,
        [
          UserId,
          AdminId,
          description,
          ProductId,
          image_url,
          name,
          price,
          quantity,
          createdAt,
          updatedAt,
        ],
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
        }
      );
    }
  });
};

const GetCart = async (req, res) => {
  const UserId = req.query.UserId;
  try {
    const query = `SELECT * FROM carts WHERE userId = ${UserId}`;
    con.query(query, (err, result) => {
      if (err) return res.status(200).json({ error: err });
      res.status(200).json({ data: result });
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const query = `DELETE FROM carts WHERE id = ?`;
    con.query(query, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { AddtoCart, GetCart, DeleteItem };
