import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid } from "semantic-ui-react";

import * as ActionCreators from "./notePageActions";

import NoteList from "./components/NoteList";
import Editor from "./components/Editor/index";

class NotePage extends Component {
  state = {
    selectedNote: null,
    articleTitle: null,
    articleContent: null,
    articles: [],
  };

  componentDidMount() {
    this.props.getAllNotes();
  }

  onWebClip = (title, content) => {
    this.setState({
      articleTitle: title,
      articleContent: content,
    });
  };

  handleSelectedNote = selectedNote => {
    this.setState({
      selectedNote,
    });
  };

  render() {
    const { articleContent, articleTitle } = this.state;

    return (
      <Grid columns={1} divided>
        <Grid.Column width={3}>
          <NoteList
            notes={this.state.articles}
            onNoteSelect={this.handleSelectedNote}
          />
        </Grid.Column>

        <Grid.Column width={13}>
          <br />
          <Editor title={articleTitle || ""} content={articleContent || ""} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  noteList: state.notePage.noteList.data,
});

const mapDispatchToProps = {
  getAllNotes: ActionCreators.getAllNotes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotePage);
