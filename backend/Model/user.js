const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("E-commerce", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [10, 10],
    },
  },
  role:{
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("User Table created successfully");
  })
  .catch((err) => console.log("Error occurred", err));

module.exports = user;
