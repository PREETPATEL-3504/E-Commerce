const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("E-commerce", "root", "root",{
    host: "localhost",
    dialect: "mysql",
});

const Order = sequelize.define("order",{
    id:{
        type: "integer",
        primaryKey: true,
        autoIncrement: true
    },
    OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}) 

sequelize.sync().then(()=>{
    console.log("Order created successfully")
})

module.exports = Order;