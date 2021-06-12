const router = require("express").Router();
const Teams = require("../models/Teams");
const Matches = require("../models/Matches");

router.get("/get", async (req, res) => {
  try {
    const teams = await Teams.find().sort({ name: 1 });
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json([]);
  }
});

router.get("/get/colors", async (req, res) => {
  try {
    const team = await Teams.findOne({ name: req.query.teamname });
    const response = { background: team.background, color: team.color };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({});
  }
});

router.get("/get/years", async (req, res) => {
  try {
    const seasons = await Matches.find({
      $or: [{ team1: req.query.teamname }, { team2: req.query.teamname }],
    })
      .distinct("season")
      .lean();
    seasons.sort(function (a, b) {
      return b - a;
      s;
    });
    res.status(200).json(seasons);
  } catch (error) {
    res.status(400).json({});
  }
});

module.exports = router;
