const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const profileRouter = require("./src/Profile/routes");
const productRouter = require("./src/Product/routes");
const gOuthMiddelware = require('./src/middleware/gOuthMiddelware');
const app = express();
dotenv.config();
app.use(cors({origin : '*'}));
app.use(bodyParser.json({inflate : true}));
app.use(gOuthMiddelware);
app.use('/api',profileRouter);
app.use('/api',productRouter);
app.listen(80);