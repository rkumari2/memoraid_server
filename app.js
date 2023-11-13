const express = require('express')
const cors = require('cors')
const logger = require('morgan')

require('dotenv').config()

const userRouter = require('./routes/userRouter')
const subjectRouter = require('./routes/subjectRouter')
const flashcardRouter = require('./routes/flashcardRouter')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))
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

module.exports = app
