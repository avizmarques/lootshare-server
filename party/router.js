const { Router } = require("express");
const auth = require("../auth/middleware");
const Party = require("../party/model");
const Character = require("../character/model");
const Chest = require("../chest/model");

const router = new Router();

router.get("/party/:id", auth, async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.id, {
      include: [
        {
          model: Character,
          include: [Chest],
        },
        Chest,
      ],
    });

    const { name, chestId, chest, characters } = party;
    return res.json({
      name,
      chestId,
      chest,
      characters,
      recentLoot: [],
      recentExpenses: [],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
