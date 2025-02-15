const dashboardCardModel = require("../models/dashboardCard");
const userModel = require("../models/user");

exports.updateStatCards = async (req, res) => {
    const userId = req.user?.userId;
    const { wpm, accuracy } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        console.log("UserID:", userId);

        const previousStats = await dashboardCardModel.find({ userId }).sort({ createdAt: -1 }).limit(1);
        const lastStats = previousStats.length > 0 ? previousStats[0] : null;

        console.log("Previous Stats:", lastStats);
        const wpmChange = lastStats && lastStats.currentTypingSpeed > 0
            ? ((wpm - lastStats.currentTypingSpeed) / lastStats.currentTypingSpeed) * 100
            : 0;

        const accuracyChange = lastStats && lastStats.accuracy > 0
            ? ((accuracy - lastStats.accuracy) / lastStats.accuracy) * 100
            : 0;

        const typingConsistency = (wpm * accuracy) / 100;
        const adjustedTypingSpeed = wpm - (100 - accuracy) / 2;

        const typingConsistencyChange = lastStats && lastStats.typingConsistency > 0
            ? ((typingConsistency - lastStats.typingConsistency) / lastStats.typingConsistency) * 100
            : 0;

        const adjustedTypingSpeedChange = lastStats && lastStats.AdjustedTypingSpeed > 0
            ? ((adjustedTypingSpeed - lastStats.AdjustedTypingSpeed) / lastStats.AdjustedTypingSpeed) * 100
            : 0;

        // **New Performance Score Calculation**
        const performanceScore = (wpm * 0.6) + (accuracy * 0.3) + (typingConsistency * 0.1);

        console.log("Calculated Performance Score:", performanceScore);

        const newStats = new dashboardCardModel({
            userId,
            currentTypingSpeed: wpm,
            accuracy,
            typingConsistency,
            AdjustedTypingSpeed: adjustedTypingSpeed,
            wpmChange,
            accuracyChange,
            typingConsistencyChange,
            AdjustedTypingSpeedChange: adjustedTypingSpeedChange,
            performanceScore
        });

        await newStats.save();

        res.json({
            success: true,
            currentTypingSpeed: wpm,
            accuracy,
            typingConsistency,
            AdjustedTypingSpeed: adjustedTypingSpeed,
            wpmChange,
            accuracyChange,
            typingConsistencyChange,
            AdjustedTypingSpeedChange: adjustedTypingSpeedChange,
            performanceScore
        });

    } catch (error) {
        console.error("Error updating stats:", error);
        res.status(500).json({ error: "Failed to update stats" });
    }
};



exports.getAreaChartHistory = async (req, res) => { 
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const stats = await dashboardCardModel.find({ userId }).sort({ createdAt: 1 });

        if (stats.length === 0) {
            return res.json([]); 
        }
        const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const history = stats.map(stat => ({
            day: dayMapping[new Date(stat.createdAt).getDay()],
            performanceScore: parseFloat(stat.performanceScore) || 0
        }));
        console.log('history', history);
        res.json(history);
    } catch (error) {
        console.error("Error fetching performance history: ", error);
        res.status(500).json({ error: "Failed to fetch performance history" });
    }
};


// LEADERBOARD DATA
//get the rank
// get the user name
//get country but display the flag
//get the performance score(but only display the highest performance score)

exports.getLeaderboard = async (req, res) => {
    try {
        const highestScores = await dashboardCardModel.aggregate([
            {
                $group: {
                    _id: "$userId",
                    highestPerformanceScore: { $max: { $toDouble: "$performanceScore" } }
                }
            },
            { $sort: { highestPerformanceScore: -1 } }
        ]);
        const userIds = highestScores.map(item => item._id);
        const users = await userModel.find({ _id: { $in: userIds } }).select("userId name");
        const profiles = await userModel.find({ userId: { $in: userIds } }).select("userId country");
        const leaderboard = highestScores.map((item, index) => {
            const user = users.find(u => u._id.equals(item._id));
            const profile = profiles.find(p => p._id.equals(item._id));
            return {
                rank: index + 1,
                username: user?.name || "Unknown",
                highestPerformanceScore: item.highestPerformanceScore,
                countryFlag: profile?.country || "",
            };
        });
        console.log('get leaderboard: ', leaderboard);
        res.json({ success: true, leaderboard });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
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