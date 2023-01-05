const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
app.use(cors({origin : '*'}));
app.use(bodyParser.json({inflate : true}));
app.get('/',(req,res)=>res.send("Hello"));
app.listen(80);