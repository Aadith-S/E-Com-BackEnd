const { Products } = require("../models/model");

module.exports = {
  getProducts: async (req, res) => {
    // try {
      console.log("in Products");
      const products = await Products.findAll();
      return res.json(products);
    // } catch (e) {
    //   return res.status(500).json({ message: "No products found" });
    // }
  },
  addProduct : async(req, res) => {
    // try {
        console.log(req.body);
        await Products.create({
          product_name : req.body.productName,
          price : req.body.productPrice,
          product_image : req.body.productImage
        })
        return res.status(201).json({ message: "Product added" });
    // }
    // catch (e) {
    //   return res.status(500).json({message: "Error Occured"});
    // }
  }
};
