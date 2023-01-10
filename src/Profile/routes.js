const express = require('express');
const { getProfile } = require('./controller');
const router = express.Router();

router.get("/profile",getProfile);

module.exports = router;