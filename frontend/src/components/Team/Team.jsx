import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PieChart } from "react-minimal-pie-chart";
import { getLimitedMatches, getMatchStats } from "../../api";
import { Link } from "react-router-dom";
import moment from "moment";
import Tile from "./Tile";

const Team = () => {
  const useStyles = makeStyles(() => ({
    container: {
      marginTop: 10,
    },
    latest: {
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      color: "white",
    },
    subLatest: {
      padding: 10,
      color: "white",
      width: 300,
      height: 200,
    },
    winloss: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    pieChart: {
      height: 110,
      width: 100,
      marginTop: 10,
      fontSize: 12,
    },
  }));
  const { teamName } = useParams();
  const [matches, setMatches] = useState([]);
  const [matchStats, setMatchStats] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const wrapper = async () => {
      setMatches([]);
      setMatchStats({});
      const matchesData = await getLimitedMatches(teamName);
      const matchStatsData = await getMatchStats(teamName);
      setMatches(matchesData);
      setMatchStats(matchStatsData);
    };
    wrapper();
  }, [teamName]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      {Object.keys(matchStats).length && matches.length ? (
        <>
          <div className={classes.winloss}>
            <Paper
              style={{
                color: "#FFF",
                background: "#2A2C36",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: 5,
                fontWeight: "bold",
                userSelect: "none",
              }}
            >
              <h2>{teamName}</h2>
            </Paper>
            <div className={classes.pieChart}>
              <PieChart
                data={[
                  { title: "Wins", value: matchStats.wins, color: "#4FA476" },
                  {
                    title: "Losses",
                    value: matchStats.losses,
                    color: "#AF5969",
                  },
                ]}
                label={({ dataEntry }) =>
                  `${Math.round(dataEntry.percentage)}% ${dataEntry.title}`
                }
                segmentsShift={2}
              />
            </div>
          </div>
          <Typography variant="h6">
            Latest Matches:
          </Typography>

          <Tile teamName={teamName} match={matches[0]} />

          <Grid
            container
            spacing={3}
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            {matches.slice(1).map((match, index) => (
              <Grid item xs={12} m={6} lg={3} key={index}>
                <Paper
                  elevation={3}
                  className={classes.subLatest}
                  style={
                    match.winner === teamName
                      ? { background: "#4FA476" }
                      : { background: "#af5969" }
                  }
                >
                  <h4 style={{ margin: "10px 0" }}>vs</h4>
                  <h3 style={{ margin: "10px 0" }}>
                    {match.team1 !== teamName ? (
                      <Link
                        style={{ color: "white", textDecoration: "underline" }}
                        to={`/${match.team1}`}
                      >
                        {match.team1}
                      </Link>
                    ) : (
                      <Link
                        style={{ color: "white", textDecoration: "underline" }}
                        to={`/${match.team2}`}
                      >
                        {match.team2}
                      </Link>
                    )}
                  </h3>
                  <p style={{ margin: "10px 0" }}>
                    {moment(match.date).format("DD MMMM YYYY")}
                  </p>
                  <h4 style={{ margin: "10px 0" }}>
                    {match.winner} won by {match.result_margin} {match.result}
                  </h4>
                </Paper>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              m={6}
              lg={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to={`/${teamName}/${matches[0].season}`}>
                <Button>{"More >"}</Button>
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default Team;
