const con = require("../db");
const products = require("../model/product");
const { io } = require("../socket");
const productValidate = require("../validation/productValidation");

const addProduct = async (req, res) => {
  const { error, value } = productValidate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  } else {
    const { name, price, description, quantity, AdminId } = req.body;
    const image_url = req.file.path;

    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = createdAt;
    const query =
      "INSERT INTO products (name, price, description, quantity, image_url, AdminId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?,?,?, ?)";
    con.query(
      query,
      [
        name,
        price,
        description,
        quantity,
        image_url,
        AdminId,
        createdAt,
        updatedAt,
      ],
      function (err, result) {
        if (err) {
          console.error("Error adding product:", err);
          res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: null,
          });
          return;
        }
        const data = {
          name: name,
          price: price,
          description: description,
          quantity: quantity,
          image_url: image_url,
          AdminId: AdminId,
        };
        const query =
          "SELECT * FROM users WHERE socketId IS NOT NULL AND role = 'user'";
        con.query(query, [], (error, result) => {
          if (result) {
            io.emit("product", data);
          }
        });

        res.status(200).json({
          status: 200,
          message: "Product added successfully",
          data: result,
        });
      }
    );
  }
};

const getProduct = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const AdminId = parseInt(req.query.AdminId) || null;

  try {
    const [result, totalResult] = await Promise.all([
      new Promise((resolve, reject) => {
        const query =
          AdminId !== null
            ? `SELECT * FROM products WHERE AdminId = ? LIMIT ? OFFSET ?`
            : `SELECT * FROM products LIMIT ? OFFSET ?`;

        con.query(
          query,
          AdminId !== null ? [AdminId, limit, offset] : [limit, offset],
          (error, rows) => {
            if (error) reject(error);
            else resolve(rows);
          }
        );
      }),
      new Promise((resolve, reject) => {
        con.query(`SELECT COUNT(*) AS total FROM products`, (error, result) => {
          if (error) reject(error);
          else resolve(result[0].total);
        });
      }),
    ]);

    res.status(200).json({
      data: result,
      total: totalResult,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  con.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    function (error, result) {
      if (error) return res.status(200).json({ error: error });
      io.emit("delete", req.params.id);
      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, quantity, image_url } = req.body;
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = createdAt;

    const updateData = {
      id: productId,
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      image_url: image_url,
      updatedAt: updatedAt,
    };

    con.query(
      "UPDATE products SET ? WHERE id = ?",
      [updateData, productId],
      (err, result) => {
        if (err) return res.status(200).json({ error: err });
        io.emit("update", updateData);
      }
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductbyid = (req, res) => {
  products.findByPk(req.params.id).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  });
};

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductbyid,
};
