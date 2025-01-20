const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: String,
    imagePath: String
});

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
