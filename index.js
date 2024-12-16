const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const userModel = require("./models/user")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/users", {})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

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