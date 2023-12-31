const { Router } = require('express')

const subjectController = require('../controllers/subjects')

const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.get('/:user_id', subjectController.show)
subjectRouter.post('/:user_id/new', subjectController.create)
subjectRouter.delete('/topic/:subjectId', subjectController.destroy)

module.exports = subjectRouter
