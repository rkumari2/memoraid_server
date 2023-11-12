require('dotenv').config()
const fs = require('fs')
const db = require('./connect')

const sql = fs.readFileSync(__dirname + '/data.sql').toString()

db.query(sql)
    .then(data => {
        db.end()
        console.log('setup complete')
    })
    .catch(error => console.log(error))
