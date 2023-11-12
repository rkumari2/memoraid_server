const db = require('../database/connect')

class User {
    constructor({ id, name, email, password }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async getAll() {
        const response = await db.query ('SELECT * FROM users')
        return response.rows.map(u => new User(u))
    }

    static async getById(id) {
        const response = await db.query('SELECT FROM users WHERE id = $1', [id]);
        if (response.rows.length != 1) {
            throw new Error ('Unable to locate user')
        }
        return new User(response.rows[0])
    }

    static async create (data) {
        const {name, email, password} = data;
        let response = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, password])
        const newId = response.rows[0].id
        const newUser = await User.getById(newId)
        return newUser
    }

    static async getByEmail(email) {
        const response = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
}

module.exports = User;
