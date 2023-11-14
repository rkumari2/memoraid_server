const bcrypt = require('bcrypt')

const User = require ('../models/User')
const Token = require('../models/Token')

async function index (req, res) {
    try {
        const users = await User.getAll()
        res.json(users)
    } catch (err) {
        res.status(500).json({'error': err.message})        
    }
}

async function register (req, res) {
    try {
        const data = req.body
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

        data.password = await bcrypt.hash(data.password, salt)

        const result = await User.create(data)

        res.status(201).send(result)
        console.log('new user created')
    } catch (err) {
        res.status(400).json({'error': err.message})        
    }
}

async function tokenIndex (req, res) {
    try {
        const tokens = await Token.getAllTokens();
        res.json(tokens)
    } catch (err) {
        res.status(500).json({'error': err.message})
    }
}

async function login (req, res) {
    const data = req.body; 

    try {
        const user = await User.getByEmail(data.email)
        const authenticated = await bcrypt.compare(data.password, user.password)

        if (!authenticated) {
            throw new Error ('Wrong Credentials')
        } else {
            const token = await Token.create(user.id)
            res.status(200).json({authenticated: true, token: token.token, token_id: token.id, user: user.name})
        }
    } catch (err) {
        res.status(401).json({error: err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.id
        const tokenToDelete = await Token.getById(id)
        await tokenToDelete.destroy()
        res.sendStatus(204)
    } catch (err) {
        res.status(404).send({error: err.message})
    }
}




module.exports = {
    index, register, tokenIndex, login, destroy
}
