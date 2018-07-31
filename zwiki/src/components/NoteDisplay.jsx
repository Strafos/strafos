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

import ReactMde, { ReactMdeTypes } from "react-mde";
import * as Showdown from "showdown";

import "react-mde/lib/styles/css/react-mde-all.css";

// Test with react-mde
class NoteDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdeState: { markdown: props.note.content },
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
    });
  }

  handleValueChange = mdeState => {
    this.setState({ mdeState });
  };

  render() {
    const { note } = this.props;
    console.log(this.state.mdeState);
    return (
      <div>
        <br />
        <br />
        <br />
        <ReactMde
          onChange={this.handleValueChange}
          editorState={this.state.mdeState}
          layout="horizontal"
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          // generateMarkdownPreview={markdown => <div>HELoo</div>}
        />
      </div>
    );
  }
}

export default NoteDisplay;
