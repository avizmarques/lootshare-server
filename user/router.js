const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("./model");
const Party = require("../party/model");
const Character = require("../character/model");
const Chest = require("../chest/model");

const router = new Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await User.create({ ...req.body, password: hashedPassword });
      return res.status(201).send("User created successfully");
    }
    return res
      .status(400)
      .send("Please provide all information needed to create an account");
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (passwordIsValid) {
        const token = toJWT({ id: user.id });
        return res.status(200).json({
          id: user.id,
          username: user.username,
          token: token,
        });
      }
    }

    return res.status(400).send("Please provide a valid email and password");
  } catch (err) {
    next(err);
  }
});

router.get("/user/:id", auth, async (req, res, next) => {
  try {
    if (parseInt(req.params.id) !== parseInt(req.user.id)) {
      return res.status(400).send("You don't have permission to do this");
    }

    const characters = await Character.findAll({
      where: {
        userId: req.user.id,
      },
      include: [Chest],
    });

    const partyIds = characters
      .map((char) => char.partyId)
      .sort((a, b) => a - b)
      .filter((id, i, array) => id !== array[i + 1]);

    const parties = await Party.findAll({
      where: {
        id: partyIds,
      },
      include: [Chest],
    });

    return res.json({ parties, characters });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
