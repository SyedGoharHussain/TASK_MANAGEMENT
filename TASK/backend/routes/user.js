const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;

    const existingEmail = await User.findOne({ email: email });
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });
    await newUser.save();
    return res.json({ message: "SignIN successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
});

//login
router.post("/log-in", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username: username });

  if (!existingUser) {
    return res.status(400).json({ message: "Incorrect username or password" });
  }

  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (data) {
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "tcmTM") }];
      const token = jwt.sign({ authClaims }, "tcmTM", { expiresIn: "2d" });

      res.status(200).json({ id: existingUser._id, token: token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});
module.exports = router;
