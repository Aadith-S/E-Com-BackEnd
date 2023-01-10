const { Users } = require("../models/model");

module.exports = {
  getProfile: async (req, res) => {
    console.log(req.userDetails);
    try {
      const users = await Users.findOne({
        where : {
            id : req.userDetails.id
        }
      });
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: "No Data Found" });
    }
  }
};
