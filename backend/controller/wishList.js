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
    "SELECT * FROM wishLists INNER JOIN products ON wishLists.productId = products.id WHERE userId = ?";
  con.query(query, [userId], (err, result) => {
    if (err) throw err;
    res.status(200).json({ result });
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM wishLists WHERE productId = ?";
  con.query(query, [id], (err, result) => {
    if (err) throw err;
    res
      .status(200)
      .json({ message: "Product removed from wishlist", data: result });
  });
};

const count = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = `SELECT COUNT(*) as total FROM wishLists WHERE userId = ${userId}`;
    con.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ data: result[0].total });
    });
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { add, get, remove, count };
