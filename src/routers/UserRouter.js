const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleWare } = require("../middleware/auth")

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/uplate-user/:id', userController.uplateUser)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)

module.exports = router