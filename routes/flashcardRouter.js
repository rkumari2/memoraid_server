const { Router } = require('express')

const flashcardController = require('../controllers/flashcards')

const flashcardRouter = Router()

flashcardRouter.get('/', flashcardController.index)
flashcardRouter.get('/subjects/:subject_id', flashcardController.show)
flashcardRouter.post('/subjects/:subject_id/new', flashcardController.create)
flashcardRouter.patch('/cards/:id', flashcardController.update)
flashcardRouter.delete('/cards/:id', flashcardController.destroy)

module.exports = flashcardRouter
