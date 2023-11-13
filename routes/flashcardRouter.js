const { Router } = require('express')

const flashcardController = require('../controllers/flashcards')

const flashcardRouter = Router()

flashcardRouter.get('/', flashcardController.index)
flashcardRouter.get('/:subject_id', flashcardController.show)
flashcardRouter.post('/:subject_id/new', flashcardController.create)

module.exports = flashcardRouter
