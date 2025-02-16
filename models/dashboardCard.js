const mongoose = require('mongoose');

const dashboardCardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    currentTypingSpeed: {type: String, required: false},
    accuracy: {type:String, required: false},
    typingConsistency: {type: String, required: false},
    AdjustedTypingSpeed: {type: String, required: false},
    wpmChange: {type: String, required: false},
    accuracyChange: {type: String, required: false},
    typingConsistencyChange: {type: String, required: false},
    AdjustedTypingSpeedChange: {type: String, required: false},
    performanceScore: {type: String, required: false},
    highestPerformanceScore: {type: String, required: false},
    gamesPlayed:  {type: String, required: false},
    bestAccuracy: {type: String, required: false},
    bestWPM: {type: String, required: false},
    rank: {type: String, required: false},
    createdAt: { type: Date, default: Date.now }
})

const dashboardCardModel = mongoose.model("dashCard", dashboardCardSchema);

module.exports = dashboardCardModel