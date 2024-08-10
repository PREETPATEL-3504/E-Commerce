const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("E-commerce", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

const wishList = sequelize.define("wishList", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    productId: {
        type: Sequelize.INTEGER,
    },
});

sequelize
  .sync()
  .then()
  .catch((err) => console.log("Error occurred", err));

module.exports = wishList;