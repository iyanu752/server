const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const userModel = require("./models/user")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://http://127.0.0.1:5173/users")

app.post('/login', (req, res) => {
    const {email, password} = req.body
    userModel.findOne({email: email})
    .then (user => {
        if (user) {
            if (user.password === password) {
                res.json( "success")
            }else {
                res.json("password is incorrect")
            }
        }else {
            res.json("no record existed")
        }
    })
})

app.post('/signup', (req, res) => {
userModel.create(req.body)
.then (users => res.json (users))
.catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log ('server is running')
})