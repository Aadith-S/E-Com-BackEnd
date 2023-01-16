const { Users } = require("../models/model");

module.exports = {
  getProfile: async (req, res) => {
    const {id} = req.userDetails;
    try {
      const users = await Users.findOne({
        where : {id}
      });
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: "No Data Found" });
    }
  }
};
