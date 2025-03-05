const express = require('express');
const { allUsers, createUser, updateRole, deleteUser } = require('./adminController');
const router = express.Router();

router.get('/users',allUsers)
router.patch('/update-role',updateRole)
router.delete('/delete/user/:uid',deleteUser)

module.exports = router