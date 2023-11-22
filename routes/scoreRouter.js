const { Router } = require('express')

const scoresController = require('../controllers/scores')

const scoreRouter = Router()

scoreRouter.get('/', scoresController.index)
scoreRouter.get('/:user_id', scoresController.show)
scoreRouter.post('/:user_id/new', scoresController.create)

module.exports = scoreRouter
