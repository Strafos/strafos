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
  TextArea,
} from "semantic-ui-react";

class NoteDisplay extends Component {
  state = {};

  parseDesc = desc => {
    const shortDesc = desc.substring(0, 200) + "...";
    return shortDesc;
  };

  render() {
    const { note } = this.props;
    return (
      <Container text>
        <Header>{note.title}</Header>
        <Divider />
        <TextArea value={note.content} />
      </Container>
    );
  }
}

export default NoteDisplay;
