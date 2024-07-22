const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("E-commerce", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adminId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});



sequelize
  .sync({force: true})
  .then(() => {
    console.log("orders table has been created.");
  })
  .catch((error) => console.log("This error occured", error));

module.exports = Order;
