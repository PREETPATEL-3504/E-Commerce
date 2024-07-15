const Joi = require("joi");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("E-commerce", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: true,  
  },
  image_url:{
    type: DataTypes.STRING,
    allowNull: true,
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Product table has been created.");
  })
  .catch((error) => console.log("This error occured", error));

module.exports = Product;
