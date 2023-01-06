const { Products } = require("../models/model");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Products.findAll();
    } catch (e) {
      return res.status(500).json({ message: "No products found" });
    }
  },
};
