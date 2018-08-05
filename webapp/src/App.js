import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Segment } from "semantic-ui-react";

import NotePage from "./screens/NotePage";
import NavBar from "./components/NavBar/NavBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Segment basic>
            <Route exact path="/" component={NotePage} />
          </Segment>
        </div>
      </Router>
    );
  }
}

export default App;
