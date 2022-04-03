const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({ message: "All inputs are required" });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user && password === user.password) {
      return res.status(200).json({ user});
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;