const express = require('express');
const { allUsers } = require('./adminController');
const router = express.Router();

router.get('/users',allUsers)

module.exports = router