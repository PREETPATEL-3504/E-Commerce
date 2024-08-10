const { query } = require("express");
const con = require("../db");
const wishList = require("../model/wishList");
const validate = require("../validation/wishListValidation");

const add = async (req, res) => {
  const { userId, productId } = req.body;
  const { error, value } = validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
      data: null,
    });
  }

  const query = "INSERT INTO wishLists (userId, productId) VALUES (?, ?)";
  con.query(query, [userId, productId], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ message: "Product added to wishlist", data: result });
  });
};

const get = async (req, res) => {
  const userId = req.params.id;
  
  const query =
    "SELECT * FROM wishLists INNER JOIN Products ON wishLists.productId = Products.id WHERE userId = ?";
  con.query(query, [userId], (err, result) => {
    if (err) throw err;
    res.status(200).json({ result });
  });
};

const remove = async (req, res) => {
  const id = req.params.id
  const query = "DELETE FROM wishLists WHERE productId = ?";
  con.query(query, [id], (err, result) => {
    if (err) throw err;
    res
     .status(200)
     .json({ message: "Product removed from wishlist", data: result });
  });
}
module.exports = { add, get, remove };
