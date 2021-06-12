import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";



const Tile = ({ team }) => {
  const useStyles = makeStyles(() => ({
    root: {
      width: 150,
      height:220,
      margin: "20px 10px",
      padding:"20px 10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color:"#000",
      transition:"background 0.4s ease",
      "&:hover":{
        background: team.background,
        color:"#FFF"
      }
    },
    logo:{
      height:110,
      width:100
    }
  }));
  const classes = useStyles();

  return (
    <Link to={`/${team.name}`}>
      <Paper
        elevation={5}
        className={classes.root}
      >
        <img src={`${process.env.PUBLIC_URL}/img/${team.name}.png`} alt="team-logo" className={classes.logo}/>
        <h3 style={{textAlign:"center",marginTop:20,fontSize:18}}>{team.name}</h3>
      </Paper>
    </Link>
  );
};

export default Tile;
