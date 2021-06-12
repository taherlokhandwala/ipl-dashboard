const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  season: {
    type: Number,
  },
  date: {
    type: String,
  },
  player_of_match: {
    type: String,
  },
  venue: {
    type: String,
  },
  team1: {
    type: String,
  },
  team2: {
    type: String,
  },
  toss_winner: {
    type: String,
  },
  toss_decision: {
    type: String,
  },
  winner: {
    type: String,
  },
  result: {
    type: String,
  },
  result_margin: {
    type: Number,
  },
  method: {
    type: String,
  },
  umpire1: {
    type: String,
  },
  umpire2: {
    type: String,
  },
});

module.exports = mongoose.model("match", MatchSchema);
