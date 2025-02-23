const sendEmailS = require("../config/email");

const postEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    await sendEmailS({ name, email, message });

    res.json({ msg: "Your message was sent successfully ✅" });

  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ msg: "Failed to send email. Please try again later ❌" });
  }
};

module.exports = { postEmail };
