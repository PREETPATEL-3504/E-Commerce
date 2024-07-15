const con = require("../db");
const Product = require("../Model/Product");
const productValidate = require("../Validation/productValidation");

const AddProduct = async (req, res) => {
  const { error, value } = productValidate(req.body);
  if (error) {
    console.log("=====================", error);
    res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  } else {
    const { name, price, description, quantity, image_url } = req.body;
    const createdAt = new Date();
    const query = 'INSERT INTO Products (name, price, description, quantity, image_url, createdAt) VALUES (?, ?, ?, ?, ?)';
    con.query(query, [name, price, description, quantity, image_url], function(err, result) {
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
    });
  }
};


const GetProduct = async (req, res) => {
  con.query("SELECT * FROM Products", function (error, rows) {
    if (error) return res.status(200).json({ error: error });
    res.status(200).json(rows);
  });
};

const deleteProduct = async (req, res) => {
  con.query(
    "DELETE FROM Products WHERE id = ",
    [req.params.id],
    function (error, result) {
      if (error) return res.status(200).json({ error: error });
      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
};

const updateProduct = async (req, res) => {
  con.query(
    "UPDATE Products SET name: req.body.name,price: req.body.price, quantity: req.body.quantity, description: req.body.description, image_url: req.body.image_url WHERE id = "[
      req.params.id
    ],
    function (error, result) {
      if (error) return res.status(200).json({ error: error });
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
  // await Product.update(
  //   {
  //     name: req.body.name,
  //     price: req.body.price,
  //     quantity: req.body.quantity,
  //     description: req.body.description,
  //     image_url: req.body.image_url,
  //   },
  //   { where: { id: req.params.id } }
  // ).then(() => {
  //   res.status(200).json({ message: "Product updated successfully" });
  // });
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
