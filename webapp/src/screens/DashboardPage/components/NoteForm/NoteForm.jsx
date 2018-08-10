import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill, { Quill } from "react-quill"; // ES6

import {
  Container,
  Segment,
  Input,
  Button,
  Divider,
  Header,
} from "semantic-ui-react";

import * as ActionCreators from "../../dashboardPageActions";

import "react-quill/dist/quill.bubble.css"; // ES6

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleSaveNote = () => {
    const { title, content } = this.state;
    const requestObj = {
      title,
      content,
      createdAt: new Date().toISOString(),
      pinned: false,
    };
    this.props.createKeepnote(requestObj);
  };

  handleTitleChange(content, delta, source, editor) {
    this.setState({ title: content });
  }

  handleContentChange(content, delta, source, editor) {
    this.setState({ content });
  }

  render() {
    const { title, content } = this.state;
    return (
      <div>
        <Container text style={{ float: "center" }}>
          <Segment>
            <ReactQuill
              className="quill-container"
              theme="bubble"
              value={title}
              onChange={this.handleTitleChange}
              bounds={".app"}
              placeholder="Title"
            />
            <Divider />
            <ReactQuill
              className="quill-container"
              theme="bubble"
              onChange={this.handleContentChange}
              value={content}
              bounds={".app"}
            />
          </Segment>
          <Button
            floated="right"
            primary
            content="Create note"
            onClick={this.handleSaveNote}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  updateKeepnote: ActionCreators.updateKeepnote,
  createKeepnote: ActionCreators.createKeepnote,
  deleteKeepnote: ActionCreators.deleteKeepnote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteForm);
