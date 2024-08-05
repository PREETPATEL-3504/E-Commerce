const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("E-commerce", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const order = sequelize.define("orders", {
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
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  status:{
    type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
    defaultValue: 'Pending',
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
  .sync()
  .then()
  .catch((err) => console.log("Error occurred", err));


module.exports = order;