const router = require("express").Router();
const Matches = require("../models/Matches");

router.get("/:teamName/stats", async (req, res) => {
  try {
    const matches = await Matches.find({
      $or: [{ team1: req.params.teamName }, { team2: req.params.teamName }],
    }).lean();
    let number_of_wins = 0;
    for (const match of matches) {
      if (match.winner === req.params.teamName) ++number_of_wins;
    }
    res
      .status(200)
      .json({ wins: number_of_wins, losses: matches.length - number_of_wins });
  } catch (error) {
    res.status(400).json([]);
  }
});

router.get("/:teamName/:limit", async (req, res) => {
  try {
    const matches = await Matches.find({
      $or: [{ team1: req.params.teamName }, { team2: req.params.teamName }],
    })
      .sort({ date: -1 })
      .limit(Number(req.params.limit));
    res.status(200).json(matches);
  } catch (error) {
    res.status(400).json([]);
  }
});

router.get("/:teamName", async (req, res) => {
  try {
    const matches = await Matches.find({
      $and: [
        {
          $or: [{ team1: req.params.teamName }, { team2: req.params.teamName }],
        },
        {
          season: req.query.season,
        },
      ],
    }).sort({ date: -1 });
    res.status(200).json(matches);
  } catch (error) {
    res.status(400).json([]);
  }
});

module.exports = router;
