const express = require("express");
const upload = require("../middleware/multer");
const {
  uploadImg,
  getImage,
  deleteImage,
} = require("../controller/profileController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = new express.Router();

router.post("/image", authMiddleware, upload.single("userImage"), uploadImg);
router.get("/image", authMiddleware, getImage);
router.delete("/image", authMiddleware,  deleteImage);
module.exports = router;
