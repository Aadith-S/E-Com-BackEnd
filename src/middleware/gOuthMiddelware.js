const { OAuth2Client } = require("google-auth-library");
const { Users } = require("../models/model");

const client = new OAuth2Client(process.env.CLIENT_ID);
module.exports = async (req, res, next) => {
  let token = req.headers["authorization"];
  token = token ? token.split(" ")[1] : null;
  if (token == "null") {
    console.log("in not");
    return next();
  } else {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });

      return ticket.getPayload();
    }

    try {
      const {
        email: payloadMail,
        given_name: payLoadFirstname,
        family_name: payloadLastname,
        picture: payloadProfilePicture,
      } = await verify();
      const user = await Users.findOne({
        where: {
          email: payloadMail,
        },
      });
      if (!user) {
        const {
          email,
          firstname,
          lastname,
          picture: profilePicture,
          id,
        } = (
          await Users.create({
            email,
            firstname,
            lastname,
            profilePicture,
            token,
          })
        ).dataValues;
        req.userDetails = { email, firstname, lastname, profilePicture, id };
      } else {
        await Users.update(
          {
            email: payloadMail,
            firstname: payLoadFirstname,
            lastname: payloadLastname,
            profilePicture: payloadProfilePicture,
            token,
          },
          {
            where: {
              email: payloadMail,
            },
          }
        );
        const {
          email,
          firstname,
          lastname,
          picture: profilePicture,
          id,
        } = (await Users.findOne({ where: { email: payloadMail } })).dataValues;
        req.userDetails = { email, firstname, lastname, profilePicture, id };
      }
      return next();
    } catch (e) {
      console.log("some error");
      return res.status(401).json("Unauthorized.");
    }
  }
};
