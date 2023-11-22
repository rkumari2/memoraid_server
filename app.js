const express = require('express')
const cors = require('cors')
const logger = require('morgan')

require('dotenv').config()

const userRouter = require('./routes/userRouter')
const subjectRouter = require('./routes/subjectRouter')
const flashcardRouter = require('./routes/flashcardRouter')
const scoreRouter = require('./routes/scoreRouter')

const app = express()
app.use(cors())
app.options('*', cors());
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.json({
        title: 'Memoraide', 
        description: 'Welcome to Memoraide!'
    })
})

app.use('/users', userRouter)

app.use('/subjects', subjectRouter)

app.use('/flashcards', flashcardRouter)

app.use('/scores', scoreRouter)

module.exports = app
