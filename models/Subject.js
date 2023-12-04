const db = require('../database/connect')

class Subject {
    constructor(data) {
        this.id = data.id
        this.user_id = data.user_id
        this.subject = data.subject
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM subjects ORDER BY id DESC')
        if (response.rows.length === 0) {
            throw new Error ('No subjects available')
        } else {
            return response.rows.map(s => new Subject(s))
        }
    }

    static async getById (id) {
        const response = await db.query('SELECT * FROM subjects WHERE id = $1', [id])

        if (response.rows.length === 0) {
            throw new Error ('Unable to locate subject')
        } 
        return new Subject(response.rows[0])
    }

    // static async getByUserId (user_id) {
    //     const response = await db.query('SELECT * FROM subjects WHERE user_id = $1 ORDER BY id DESC', [user_id])

    //     if (response.rows.length === 0) {
    //         throw new Error ('Unable to locate subject by user_id')
    //     } 
    //     return response.rows.map(s => new Subject(s))
    // }

    static async getByUserIdWithFlashcards(user_id) {
        try {
            const response = await db.query(`
                SELECT subjects.*, flashcards.*
                FROM subjects
                LEFT JOIN flashcards ON subjects.id = flashcards.subject_id
                WHERE subjects.user_id = $1
                ORDER BY subjects.id DESC;
            `, [user_id]);
    
            if (response.rows.length === 0) {
                throw new Error('No subjects available for the user');
            }
    
            const subjects = [];
            let currentSubject = null;
    
            response.rows.forEach((row) => {
                if (!currentSubject || currentSubject.id !== row.subject_id) {
                    // New subject encountered
                    currentSubject = new Subject({
                        id: row.subject_id,
                        user_id: row.user_id,
                        subject: row.subject,
                    });
                    currentSubject.flashcards = [];
                    subjects.push(currentSubject);
                }
    
                if (row.flashcard_id) {
                    currentSubject.flashcards.push({
                        id: row.flashcard_id,
                        subject_id: row.subject_id,
                        question: row.question,
                        answer: row.answer,
                    });
                }
            });
    
            return subjects;
        } catch (error) {
            throw error;
        }
    }

    static async createSubject (data) {
        try {
            const { user_id, subject } = data;
            
            const userExists = await db.query('SELECT 1 FROM users WHERE id = $1', [user_id]);
            if (userExists.rows.length === 0) {
              throw new Error('User does not exist');
            }
            
            const response = await db.query('INSERT INTO subjects (user_id, subject) VALUES ($1, $2) RETURNING id;', [user_id, subject]);
            const newSubjectId = response.rows[0].id;
            const newSubject = await Subject.getById(newSubjectId);
            
            return newSubject;
          } catch (error) {
            throw error;
          }
    }

    static async DeleteSubject (id) {
        try {
            const subjectExists = await db.query('SELECT 1 FROM subjects WHERE id = $1', [id]);
            if (subjectExists.rows.length === 0) {
                throw new Error('Subject does not exist');
            }

            await db.query('DELETE FROM flashcards WHERE subject_id = $1', [id]);

            await db.query('DELETE FROM subjects WHERE id = $1', [id]);

            return { success: true, message: 'Subject and associated flashcards deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Subject
