import React, { Component } from "react";

import { Grid } from "semantic-ui-react";

import NoteList from "./components/NoteList";
import Editor from "./components/Editor/index";
import { getArticles } from "../../utils/api";

class NotePage extends Component {
  state = {
    selectedNote: null,
    articleTitle: null,
    articleContent: null,
    articles: [],
  };

  componentDidMount() {
    getArticles().then(articles => this.setState({ articles }));
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
    console.log(this.state.articles);

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

export default NotePage;
