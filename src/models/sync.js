const { Users, Products } = require("./model");

Users.sync();
Products.sync({alter : true});

