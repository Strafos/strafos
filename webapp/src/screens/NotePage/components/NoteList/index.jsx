import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import "./NoteList.css";

import { Divider, Container, Loader } from "semantic-ui-react";

import NotePreview from "./NotePreview";

class NoteList extends Component {
  state = {};

  renderNote = note => {
    const { onNoteSelect } = this.props;
    return (
      <Container onClick={() => onNoteSelect(note)}>
        <NotePreview
          title={note.title}
          date={note.date}
          content={note.preview}
        />
        <Divider />
      </Container>
    );
  };

  render() {
    const { notes } = this.props;
    if (!notes) {
      return <Loader />;
    }

    return (
      <Container style={{ paddingLeft: "10px", paddingTop: "5px" }}>
        <div id="scrollable-content">
          {notes.map(note => this.renderNote(note))}
        </div>
      </Container>
    );
  }
}

export default NoteList;
