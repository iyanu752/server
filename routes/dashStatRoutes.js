const express = require ("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = new express.Router();
const {updateStatCards, getStatsCards} = require ('../controller/dashStatsController')

router.post("/dashstats", authMiddleware, updateStatCards);
router.get("/dashstats", authMiddleware, getStatsCards);
module.exports = router;
