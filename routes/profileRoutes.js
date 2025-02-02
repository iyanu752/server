const express = require("express");
const upload = require("../middleware/multer");
const {
  uploadImg,
  getImage,
  deleteImg,
} = require("../controller/profileController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = new express.Router();

router.post("/image", authMiddleware, upload.single("userImage"), uploadImg);
router.get("/image/:id", getImage);
router.delete("/image/:id", deleteImg);
module.exports = router;
