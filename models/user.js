const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, default: function () { return this._id.toString(); } },
    name: { type: String, required: true },
    email:  { type: String, unique: true, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    profileImg: { type: String, required: false}
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
