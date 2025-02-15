const express = require ("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = new express.Router();
const {updateStatCards, getStatsCards, getAreaChartHistory, getLeaderboard} = require ('../controller/dashStatsController')

router.post("/dashstats", authMiddleware, updateStatCards);
router.get("/dashstats", authMiddleware, getStatsCards);
router.get("/performance-history", authMiddleware, getAreaChartHistory);
router.get("/leaderboard",authMiddleware, getLeaderboard)
module.exports = router;
