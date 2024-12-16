const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const userModel = mongoose.model("users",  UserSchema)
module.export = userModel;