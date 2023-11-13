const { Router } = require('express')

const subjectController = require('../controllers/subjects')

const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:user_id', subjectController.show)
subjectRouter.post('/new', subjectController.create)

module.exports = subjectRouter
