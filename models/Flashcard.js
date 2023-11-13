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
            return response.rows.map(c => new Flashcard(c))
        }
    }

    static async getById (id) {
        const response = await db.query('SELECT * FROM flashcards WHERE id = $1', [id])

        if (response.rows.length === 0) {
            throw new Error ('Unable to locate flashcard')
        } 
        return new Flashcard(response.rows[0])
    }

    static async createCard (data) {
        try {
            const { subject_id, question, answer } = data;
            
            // const userExists = await db.query('SELECT 1 FROM users WHERE id = $1', [user_id])
            // if (userExists.rows.length === 0) {
            //   throw new Error('User does not exist')
            // }

            const subjectExists = await db.query('SELECT * FROM subjects WHERE id = $1', [subject_id])
            if (subjectExists.rows.length === 0) {
                throw new Error('Subject does not exist')
              }

            const response = await db.query('INSERT INTO flashcards (subject_id, question, answer) VALUES ($1, $2, $3) RETURNING id;', [subject_id, question, answer]);
            const newId = response.rows[0].id;
            const newCard = await Flashcard.getById(newId);
            
            return newCard;
          } catch (error) {
            throw error;
          }
    }

    static async getBySubjectId(subject_id) {
        const response = await db.query('SELECT * FROM  flashcards WHERE subject_id = $1;', [subject_id])
        
        if (response.rows.length === 0) {
            throw new Error ('No flashcards available in this subject')
        }

        return response.rows.map(c => new Flashcard(c))
    }
}

module.exports = Flashcard
