const express = require('express');
const { allUsers, createUser, updateRole } = require('./adminController');
const router = express.Router();

router.get('/users',allUsers)
router.patch('/update-role',updateRole)

module.exports = router