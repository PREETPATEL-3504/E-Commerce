const con = require("../db");
const Product = require("../Model/Product");
const productValidate = require("../Validation/productValidation");

const AddProduct = async (req, res) => {
  const { error, value } = productValidate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  } else {
    const { name, price, description, quantity, image_url } = req.body;

    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const updatedAt = createdAt;
    const query =
      "INSERT INTO Products (name, price, description, quantity, image_url, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?,?,?)";
    con.query(
      query,
      [name, price, description, quantity, image_url, createdAt, updatedAt],
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
        console.log("Product added successfully", result);
        res.status(200).json({
          status: 200,
          message: "Product added successfully",
          data: result,
        });
      }
    );
  }
};

const GetProduct = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const [result, totalResult] = await Promise.all([
      new Promise((resolve, reject) => {
        con.query(
          `SELECT * FROM Products LIMIT ? OFFSET ?`,
          [limit, offset],
          (error, rows) => {
            if (error) reject(error);
            else resolve(rows);
          }
        );
      }),
      new Promise((resolve, reject) => {
        con.query(`SELECT COUNT(*) AS total FROM Products`, (error, result) => {
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
    "DELETE FROM Products WHERE id = ?",
    [req.params.id],
    function (error, result) {
      if (error) return res.status(200).json({ error: error });
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
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      image_url: image_url,
      updatedAt: updatedAt,
    };

    const updatedProduct = await con.query(
      "UPDATE Products SET ? WHERE id = ?",
      [updateData, productId]
    );

    if (updatedProduct.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductbyid = (req, res) => {
  Product.findByPk(req.params.id).then((product) => {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  });
};

module.exports = {
  AddProduct,
  GetProduct,
  deleteProduct,
  updateProduct,
  getProductbyid,
};
