const Score = require ('../models/Score')

async function index (req, res) {
    try {
        const scores = await Score.getAll()
        res.status(200).json(scores)
    } catch (err) {
        res.status(500).json({'error': err.message})
    }
}

async function create (req, res) {
    try {
        const user_id = parseInt(req.params.user_id);
        const data = { user_id, ...req.body };
        const result = await Score.createScore(data)
        res.status(201).send(result)
    } catch (err) {
        res.status(400).json({'error': err.message})  
    }
}

async function show (req, res) {
    try {
        const user_id = parseInt(req.params.user_id)
        const scorecard = await Score.getByUserId(user_id)
        res.status(200).json(scorecard)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
    index, create, show
}
