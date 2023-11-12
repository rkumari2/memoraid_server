const { Router } = require('express')

const userController = require('../controllers/users')

const userRouter = Router()

userRouter.get('/', userController.index)
userRouter.get('/tokens', userController.tokenIndex)
userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.delete('/tokens/:user_id', userController.destroy)

module.exports = userRouter;
