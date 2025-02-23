const express = require("express");
const router = express.Router();
const { postEmail } = require("../controller/emailController"); 

router.post("/sendemail", postEmail); 

module.exports = router;