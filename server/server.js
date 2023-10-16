const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const { createHash } = require('crypto')

app.use(express.json())
app.use(cors())

const hash = (string) => {
    return createHash('sha256').update(string).digest('hex');
}

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "laguarderia"
})

app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("INSERT INTO users (username, password) VALUES (?,?)",
    [username, password], (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password], 
    (err, result) => {
        if(err) {
            res.send({ err: err })
        } 
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({ message: 'Wrong username/password combination'})
        }
    })
})

// app.get('/api', (req, res) => {
//     res.json({ "users": ["userOne", "userTwo", "userThree"] })
// })

app.listen(5000, () => {
    console.log('Server started on port 5000')
})