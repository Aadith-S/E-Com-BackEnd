const { OAuth2Client } = require("google-auth-library");
const { Users } = require("../models/model");

const client = new OAuth2Client(
  process.env.CLIENT_ID
);
module.exports = async(req, res, next) => {
  let token = req.headers["authorization"];
  token = token ? token.split(" ")[1] : null;
  if(token == "null") {
    console.log("in not");
    return next();
  }
  else{
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,

        audience:process.env.CLIENT_ID,
      });

      return ticket.getPayload();
    }

    try {
      const payload = await verify();
      console.log(payload.picture);
      const user = await Users.findOne({
        where : {
            email : payload.email
        }
      })
      if(!user){
        const details = await Users.create({
            email : payload.email,
            firstname : payload.given_name,
            lastname : payload.family_name,
            profilePicture : payload.picture,
            token : token
        })
        req.userDetails = {
            email : details.dataValues.email,
            firstname : details.dataValues.firstname,
            lastname : details.dataValues.lastname,
            profilePicture : details.dataValues.picture,
            id : details.dataValues.id
        }
      }
      else {
        await Users.update({
            firstname : payload.given_name,
            lastname : payload.family_name,
            profilePicture : payload.picture,
            token : token
        },
        {
            where : {
                email : payload.email
            }
        })
        const userDetails = await Users.findOne({where : {email : payload.email}})
        req.userDetails = {
            email : userDetails.dataValues.email,
            firstname : userDetails.dataValues.firstname,
            lastname : userDetails.dataValues.lastname,
            profilePicture : userDetails.dataValues.profilePicture,
            id : userDetails.dataValues.id
        }
      }

      return next();
    } catch (e) {
        console.log("some error");
    return res
        .status(401)
        .json("Unauthorized.");
    }
  }
};
