const { Op } = require("sequelize");
const { Products } = require("../models/model");

module.exports = {
  getProducts: async (req, res) => {
    try {
      let filters={};
      console.log(parseInt(req.query.min));
      if(req.query){
        if(isNaN(parseInt(req.query.min))){
          console.log("in test");
        }
        if(isNaN(parseInt(req.query.min)) === false && isNaN(parseInt(req.query.max)) === false){
          console.log("in not a number");
          filters = {
            where :{
            price : { [Op.between] : [parseInt(req.query.min),parseInt(req.query.max)]}
          },
          order : [["price", req.query.sort]]
        }
        }
        else if(isNaN(parseInt(req.query.min)) === false){
          filters = {
            where :{
            price : { [Op.gte] : parseInt(req.query.min)}
          },
          order : [["price", req.query.sort]]
        }
      }
      else if(isNaN(parseInt(req.query.max)) === false){
        filters = {
          where :{
          price : { [Op.lte] : parseInt(req.query.max)}
        },
        order : [["price", req.query.sort]]
      }
      }
        else{
        filters = {
          order : [["price", req.query.sort]]
        }
      }
      }
      console.log(filters);
      console.log("in Products");
      const products = await Products.findAll(filters);
      return res.json(products);
    } catch (e) {
      return res.status(500).json({ message: "No products found" });
    }
  },
  addProduct : async(req, res) => {
    try {
        console.log(req.body);
        await Products.create({
          product_name : req.body.productName,
          price : req.body.productPrice,
          product_image : req.body.productImage
        })
        return res.status(201).json({ message: "Product added" });
    }
    catch (e) {
      return res.status(500).json({message: "Error Occured"});
    }
  }
};
