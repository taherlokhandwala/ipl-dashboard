import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, Link } from "react-router-dom";
import { getAllYears, getMatchesForYear } from "../../api";
import Tile from "../Team/Tile";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 10,
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Season = () => {
  const { teamName, season } = useParams();
  const [matches, setMatches] = useState([]);
  const [years, setYears] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setMatches([]);
    setYears([]);
    const wrapper = async () => {
      const matchesData = await getMatchesForYear(teamName, season);
      const yearsData = await getAllYears(teamName);
      setMatches(matchesData);
      setYears(yearsData);
    };
    wrapper();
  }, [season, teamName]);

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        {matches.length && years.length ? (
          <Grid container justify="space-between">
            <Grid item m={2} className={classes.gridItem}>
              <h3 style={{ marginBottom: 5 }}>Select Year</h3>
              {years.map((year, index) =>
                year === Number(season) ? (
                  <Link to={`/${teamName}/${year}`} key={index}>
                    <Button variant="contained" color="primary">
                      {year}
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/${teamName}/${year}`} key={index}>
                    <Button style={{ margin: "3px 0" }}>{year}</Button>
                  </Link>
                )
              )}
            </Grid>
            <Grid item lg={10} xs={12} className={classes.gridItem}>
              <h2 style={{marginBottom:15}}>{teamName} matches for {season} :</h2>
              {matches.map((match, index) => (
                <Tile
                  key={index}
                  match={match}
                  teamName={teamName}
                  loop={true}
                />
              ))}
            </Grid>
          </Grid>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
      </Container>
    </>
  );
};

export default Season;
