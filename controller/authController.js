const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({
            message: "Login successful",
            token,
            user,
            userId: user.userId, // Include userId in the response
          });
        } else {
          res.status(401).json({ message: "Password is incorrect" });
        }
      } else {
        res.status(404).json({ message: "No record found for this email" });
        console.log("it reached here");
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.signup = (req, res) => {
  userModel
    .create(req.body)
    .then((user) =>
      res.json({
        message: "User created successfully",
        userId: user.userId, // Return the generated userId
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
};
