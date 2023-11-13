const Subject = require('../models/Subject')

async function index (req, res) {
    try {
        const subjects = await Subject.getAll()
        res.status(200).json(subjects)
    } catch (err) {
        res.status(500).json({'error': err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body; 
        const result = await Subject.createSubject(data)
        res.status(201).send(result)
    } catch (err) {
        res.status(400).json({'error': err.message})  
    }
}

module.exports = {
    index, create
}
