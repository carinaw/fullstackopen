const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, likes: 1 });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "Please provide username and password" });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password need to have at least 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);

  const uniqueUser = async (username) => {
    const existingUser = await User.findOne({ username });
    return !existingUser;
  };
  const unique = await uniqueUser(username);
  if (!unique) {
    return response
      .status(400)
      .json({ error: "This username already exists." });
  }
});

module.exports = usersRouter;
