const dashboardCardModel = require("../models/dashboardCard");


exports.updateStatCards = async (req, res) => {
    const userId = req.user?.userId;
    const { wpm, accuracy } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        console.log("UserID:", userId);

        const previousStats = await dashboardCardModel.findOne({ userId }).sort({ createdAt: -1 });
        console.log("Previous Stats:", previousStats);

        const wpmChange = previousStats && previousStats.currentTypingSpeed
            ? ((wpm - previousStats.currentTypingSpeed) / (previousStats.currentTypingSpeed || 1)) * 100
            : 0;

        const accuracyChange = previousStats && previousStats.accuracy
            ? ((accuracy - previousStats.accuracy) / (previousStats.accuracy || 1)) * 100
            : 0;

        const typingConsistency = (wpm * accuracy) / 100;
        const AdjustedTypingSpeed = wpm - (100 - accuracy) / 2;

        const typingConsistencyChange = previousStats && previousStats.typingConsistency
            ? ((typingConsistency - previousStats.typingConsistency) / (previousStats.typingConsistency || 1)) * 100
            : 0;

        const AdjustedTypingSpeedChange = previousStats && previousStats.AdjustedTypingSpeed
            ? ((AdjustedTypingSpeed - previousStats.AdjustedTypingSpeed) / (previousStats.AdjustedTypingSpeed || 1)) * 100
            : 0;

        const newStats = new dashboardCardModel({
            userId,
            currentTypingSpeed: wpm,
            accuracy,
            typingConsistency,
            AdjustedTypingSpeed,
            wpmChange,
            accuracyChange,
            typingConsistencyChange,
            AdjustedTypingSpeedChange
        });

        await newStats.save();

        res.json({
            success: true,
            currentTypingSpeed: wpm,
            accuracy,
            typingConsistency,
            AdjustedTypingSpeed,
            wpmChange,
            accuracyChange,
            typingConsistencyChange,
            AdjustedTypingSpeedChange
        });
    } catch (error) {
        console.error("Error updating stats:", error);
        res.status(500).json({ error: "Failed to update stats" });
    }
};


exports.getStatsCards = async (req, res) => {
    try {
        const userId = req.user.userId;
        if(!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const stats = await dashboardCardModel.find({ userId }).sort({ createdAt: -1 }).limit(2);
    res.json({
        current: stats[0] || null,
        previous: stats[1] || stats[0] || null,
      });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
}