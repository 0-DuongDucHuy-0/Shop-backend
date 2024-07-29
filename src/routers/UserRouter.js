const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/auth")

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/uplate-user/:id', userController.uplateUser)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
router.get('/get-all-user', authMiddleWare, userController.getAllUser)
router.get('/get-details/:id', authUserMiddleWare, userController.getDetailsUser)
router.post('/refresh-token', userController.refreshToken)

module.exports = router