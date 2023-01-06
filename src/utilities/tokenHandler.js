const jwt = require("jsonwebtoken");

module.exports = {
    signToken : (data)=>{
        return jwt.sign(data,JWT_SECRET_KEY,{
            expiresIn: "1d",
            algorithm: "HS256",
        });
    },
    verifyToken : (token)=>{
        return jwt.verify(token,JWT_SECRET_KEY);
    }
}