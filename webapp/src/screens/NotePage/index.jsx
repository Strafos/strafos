import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid } from "semantic-ui-react";

import * as ActionCreators from "./notePageActions";
import * as CommonActions from "../../commonActions";

import NoteList from "./components/NoteList";
import Editor from "./components/Editor/Editor";

const sortNotes = (noteA, noteB) => {
  const timeA = new Date(noteA.updated_at).getTime();
  const timeB = new Date(noteB.updated_at).getTime();
  return timeB - timeA;
};

class NotePage extends Component {
  state = { selectedNote: null };

  componentDidMount() {
    this.props.getAllNotes();
  }

  onWebClip = selectedNote => {
    this.setState({
      selectedNote,
    });
  };

  handleSelectedNote = noteId => {
    const { noteList } = this.props;
    this.setState({
      selectedNote: noteList.find(note => note.id === noteId),
    });
  };

  render() {
    const { selectedNote } = this.state;
    const { noteList } = this.props;

    noteList && noteList.sort(sortNotes);

    return (
      <Grid columns={1} divided>
        <Grid.Column width={3}>
          <NoteList notes={noteList} onNoteSelect={this.handleSelectedNote} />
        </Grid.Column>

        <Grid.Column width={13}>
          <br />
          <Editor selectedNote={selectedNote || (noteList && noteList[0])} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  noteList: state.notePage.noteList.data,
  selectedNote: state.notePage.noteList.data && state.notePage.noteList.data[0],
});

const mapDispatchToProps = {
  getAllNotes: ActionCreators.getAllNotes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotePage);
