const { Op } = require("sequelize");
const { Products } = require("../models/model");

module.exports = {
  getProducts: async (req, res) => {
    try {
      let filters={}; 
      const {min,max,sort} = req.query;
      if(req.query){
        if(isNaN(parseInt(min)) === false && isNaN(parseInt(max)) === false){
          filters = {
            where :{
            price : { [Op.between] : [parseInt(min),parseInt(max)]}
          },
          order : [["price", sort]]
        }
        }
        else if(isNaN(parseInt(min)) === false){
          filters = {
            where :{
            price : { [Op.gte] : parseInt(min)}
          },
          order : [["price", sort]]
        }
      }
      else if(isNaN(parseInt(max)) === false){
        filters = {
          where :{
          price : { [Op.lte] : parseInt(max)}
        },
        order : [["price", sort]]
      }
      }
        else{
        filters = {
          order : [["price", sort]]
        }
      }
      };
      const products = await Products.findAll(filters);
      return res.json(products);
    } catch (e) {
      return res.status(500).json({ message: "No products found" });
    }
  },
  addProduct : async(req, res) => {
    console.log("in addProduct");
    const {productName:product_name,productPrice:price,productImage:product_image} = req.body;
    try {
        await Products.create({
          product_name,product_image,price
        })
        return res.status(201).json({ message: "Product added" });
    }
    catch (e) {
      return res.status(500).json({message: "Error Occured"});
    }
  }
};
