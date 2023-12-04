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
        const user_id = parseInt(req.params.user_id); 
        const data = { user_id, ...req.body };
        const result = await Subject.createSubject(data)
        res.status(201).send(result)
    } catch (err) {
        res.status(400).json({'error': err.message})  
    }
}

// async function show (req, res) {
//     try {
//         const id = parseInt(req.params.user_id)
//         const subjects = await Subject.getByUserId(id)
//         res.status(200).json(subjects)

//     } catch (err) {
//         res.status(404).json({ error: err.message })
//     }
// }

async function show(req, res) {
    try {
        const id = parseInt(req.params.user_id);
        const subjects = await Subject.getByUserIdWithFlashcards(id);
        res.status(200).json(subjects);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function destroy (req, res) {
    try {
        const subjectId = parseInt(req.params.subjectId)
        await Subject.DeleteSubject(subjectId)
        res.status(204).send()

    } catch (err) {
        res.status(400).json({ 'error': err.message });
    }
}

module.exports = {
    index, create, show, destroy
}
