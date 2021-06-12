import React from "react";
import {
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";

const Tile = ({match,teamName,loop=false})=>{
  const useStyles = makeStyles(() => ({
    latest: {
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      color: "white",
      marginBottom: loop?15:0
    }
  }));
    const classes = useStyles();
    return (
        <Paper
            elevation={5}
            className={classes.latest}
            style={
              match.winner === teamName
                ? { background: "#4FA476" }
                : { background: "#af5969" }
            }
          >
            <div>
              <h3 style={{ margin: "10px 0" }}>vs</h3>
              <h2 style={{ margin: "10px 0" }}>
                {match.team1 !== teamName ? (
                  <Link style={{ color: "white",textDecoration: "underline" }} to={`/${match.team1}`}>
                    {match.team1}
                  </Link>
                ) : (
                  <Link style={{ color: "white",textDecoration: "underline" }} to={`/${match.team2}`}>
                    {match.team2}
                  </Link>
                )}
              </h2>
              <p style={{ margin: "10px 0" }}>
                {moment(match.date).format("DD MMMM YYYY")}
              </p>
              <p style={{ margin: "10px 0" }}>
                at{" "}
                <a
                  href={`https://www.google.com/search?q=${match.venue}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white",textDecoration: "underline" }}
                >
                  {match.venue}
                </a>
              </p>
              <h3 style={{ margin: "10px 0" }}>
                {match.winner} won by {match.result_margin}{" "}
                {match.result}
              </h3>
            </div>
            <div>
              <p style={{ margin: "10px 0 5px 0" }}>
                <span style={{ fontWeight: "bold" }}>
                  {match.toss_winner}
                </span>{" "}
                won the toss
              </p>
              <p>
                and chose to{" "}
                <span style={{ fontWeight: "bold" }}>
                  {match.toss_decision}
                </span>
              </p>
              <h3 style={{ margin: "10px 0 5px 0" }}>Man of the Match:</h3>
              <p>
                <a
                  href={`https://www.google.com/search?q=${match.player_of_match}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white",textDecoration: "underline" }}
                >
                  {match.player_of_match}
                </a>
              </p>
              <h3 style={{ margin: "10px 0 5px 0" }}>Umpires:</h3>
              <p>
                <a
                  href={`https://www.google.com/search?q=${match.umpire1}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white",textDecoration: "underline" }}
                >
                  {match.umpire1}
                </a>
                ,{" "}
                <a
                  href={`https://www.google.com/search?q=${match.umpire2}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white",textDecoration: "underline" }}
                >
                  {match.umpire2}
                </a>
              </p>
            </div>
          </Paper>
    );
}

export default Tile;