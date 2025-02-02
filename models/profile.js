const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: String, unique: true, default: function () { return this._id.toString(); } },
    image:{publicId:{type: String,required: false},
    url: { type: String, required: false,}}
});

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;
