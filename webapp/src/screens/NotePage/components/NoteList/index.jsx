import React, { PureComponent } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import "./NoteList.css";

import { Divider, Container, Loader } from "semantic-ui-react";

import NotePreview from "./NotePreview";

class NoteList extends PureComponent {
  state = {};

  renderNote = note => {
    const { onNoteSelect } = this.props;
    return (
      <Container key={note.id} onClick={() => onNoteSelect(note.id)}>
        <NotePreview
          title={note.title}
          date={new Date(note.updated_at).toLocaleDateString()}
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

    notes.sort((noteA, noteB) => {
      const timeA = new Date(noteA.updated_at).getTime();
      const timeB = new Date(noteB.updated_at).getTime();
      return timeB - timeA;
    });

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
