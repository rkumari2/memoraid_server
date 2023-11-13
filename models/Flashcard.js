const db = require('../database/connect')

class Flashcard {
    constructor(data) {
        this.id = data.id
        this.user_id = data.user_id
        this.subject_id = data.subject_id
        this.question = data.question
        this.answer = data.answer
    }

    static async getAll () {
        const response = await db.query('SELECT * FROM flashcards')
        if (response.rows.length === 0) {
            throw new Error ('No flashcards available')
        } else {
            return response.rows.map(s => new Subject(s))
        }
    }
}

module.exports = Flashcard
