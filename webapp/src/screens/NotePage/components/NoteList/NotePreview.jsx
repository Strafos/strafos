import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  Card,
  Message,
  Segment,
  Header,
  Divider,
  Button,
  Grid,
  Container,
} from "semantic-ui-react";

class NoteList extends Component {
  state = {};

  parseDesc = content => {
    const shortDesc = content.substring(0, 200) + "...";
    return shortDesc;
  };

  render() {
    const { title, date, content } = this.props;
    return (
      <Container style={{ cursor: "pointer" }}>
        <Header>
          {title}
          <Header.Content>
            <Header.Subheader>{date}</Header.Subheader>
            <Header.Subheader>{this.parseDesc(content)}</Header.Subheader>
          </Header.Content>
        </Header>
      </Container>
    );
  }
}

export default NoteList;
