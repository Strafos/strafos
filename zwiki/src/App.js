import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Message, Header, Divider, Button, Grid } from "semantic-ui-react";

import "./semantic/dist/semantic.min.css";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <div className="App">
          <Grid columns={2} divided>
            <Grid.Column width={3}>Foo</Grid.Column>

            <Grid.Column width={13}>Bar</Grid.Column>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
