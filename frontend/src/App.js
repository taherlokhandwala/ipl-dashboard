import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Home, Team, Season } from "./components";
import { useMediaQuery } from "@material-ui/core";
import "./App.css";

function App() {
  const width = useMediaQuery("(min-width:600px)");

  return (
    <Router>
      {width ? (
        <>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/:teamName" exact component={Team} />
          <Route path="/:teamName/:season" exact component={Season} />
        </>
      ) : (
        <div className="App">
          <div className="container">
            <h1>
              Mobile Responsive Website
              <br />
              COMING SOON
            </h1>
            <br />
            <br />
            <h3>
              Until then please check out the
              <br />
              website on a Desktop / Laptop.
            </h3>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
