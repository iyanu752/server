const mongoose = require('mongoose');

const dashboardCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    currentTypingSpeed: {type: String, required: false},
    accuracy: {type:String, required: false},
    typingConsistency: {type: String, required: false},
    AdjustedTypingSpeed: {type: String, required: false},
    wpmChange: {type: String, required: false},
    accuracyChange: {type: String, required: false},
    consistencyChange: {type: String, required: false},
    adjustedWpmChange: {type: String, required: false},
    createdAt: { type: Date, default: Date.now }
})

const dashboardCardModel = mongoose.model("dashCard", dashboardCardSchema);

module.exports = dashboardCardModel