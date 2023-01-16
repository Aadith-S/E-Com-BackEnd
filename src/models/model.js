const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MODEL_UNAME);
console.log(process.env.MODEL_PASSWORD);
const sequelize = new Sequelize({
  dialect: "mysql",

  host: "localhost",

  username: process.env.MODEL_UNAME,

  password: process.env.MODEL_PASSWORD,

  database: "eCom",
});

const Users = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,
  },

  firstname: {
    type: DataTypes.STRING(50),

    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING(50),

    allowNull: true,
  },

  email: {
    type: DataTypes.STRING(50),

    allowNull: false,

    unique: true,
  },
  profilePicture : {
    type : DataTypes.STRING(100),
    allowNull : true
  }
});

const Products = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,
  },

  product_name: {
    type: DataTypes.STRING(50),

    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,

    allowNull: false,
  },

  product_image: {
    type: DataTypes.STRING(300),
    allowNull: true,
  },
});

module.exports= {Users,Products}
