const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");


exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            return res.status(500).json({ error: "Error comparing passwords" });
          }
          if (match) {
            const token = jwt.sign(
              { userId: user.userId },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            const { password, ...userData } = user.toObject();

            return res.json({
              message: "Login successful",
              token,
              user: userData,
              userId: user.userId,
            });
          } else {
            return res.status(401).json({ message: "Password is incorrect" });
          }
        });
      } else {
        res.status(404).json({ message: "No record found for this email" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.signup = (req, res) => {
  const { email, password, ...rest } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }
    userModel
      .create({ email, password: hashedPassword, ...rest })
      .then((user) => {
        const { password, ...userData } = user.toObject();
        res.json({
          message: "Signup successful",
          user: userData, 
          userId: user.userId, 
        });
      })
      .catch((err) => res.status(400).json({ error: err.message }));
  });
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
