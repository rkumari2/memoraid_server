const { Router } = require('express')

const subjectController = require('../controllers/subjects')

const subjectRouter = Router()

subjectRouter.get('/', subjectController.index)
subjectRouter.post('/new', subjectController.create)

module.exports = subjectRouter
