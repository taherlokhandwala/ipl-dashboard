import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "./logo.png";

const useStyles = makeStyles(() => ({
  header: {
    color: "#193888",
    fontWeight: "bold",
    padding: 20,
    userSelect: "none",
    cursor: "pointer",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    fontSize:32
  },
  logo: {
    height: 80,
    width: 100,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Link to="/">
      <Typography className={classes.header} variant="h2" align="center">
        <img src={Logo} alt="IPL Logo" className={classes.logo} /> IPL Dashboard
      </Typography>
    </Link>
  );
};

export default Header;
