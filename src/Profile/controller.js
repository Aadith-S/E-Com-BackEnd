const { Users } = require("../models/model");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const users = await Users.findAll();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: "No Data Found" });
    }
  }
};
