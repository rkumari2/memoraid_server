const db = require('../database/connect')

class Score {
    constructor(data) {
        this.id = data.id
        this.user_id = data.user_id
        this.date = data.date
        this.totalScore = data.totalScore
        this.rightAnswer = data.rightAnswer
        this.totalQuestions = data.totalQuestions
        this.subject = data.subject
    }

    static async getAll () {
        const response = await db.query('SELECT * FROM scores')
        if (response.rows.length === 0) {
            throw new Error ('No score data available')
        } else {
            return response.rows.map(s => new Score(s))
        }
    }

    static async getByUserId (user_id) {
        const response = await db.query('SELECT * FROM scores WHERE user_id = $1', [user_id])

        // if (response.rows.length === 0) {
        //     throw new Error ('No scores available for this user')
        // }

        return response.rows.map(c => new Score(c))
    }

    static async getById (id) {
        const response = await db.query('SELECT * FROM scores WHERE id = $1', [id])

        if (response.rows.length === 0) {
            throw new Error ('Unable to locate scores')
        } 
        return new Score(response.rows[0])
    }

    static async createScore (data) {
        try {
            const {user_id, date, totalScore, rightAnswer, totalQuestions, subject} = data

            const userExists = await db.query ('SELECT * FROM users WHERE id = $1', [user_id])
            if (userExists.rows.length === 0) {
                throw new Error ('user does not exist')
            }

            const response = await db.query('INSERT INTO scores (user_id, date, totalScore, rightAnswer, totalQuestions, Subject) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [user_id, date, totalScore, rightAnswer, totalQuestions, subject])

            const newId = response.rows[0].id
            const newScoreCard = await Score.getByUserId(newId)

            return newScoreCard;

        } catch (err) {
            throw err
            
        }
    }
}

module.exports = Score
