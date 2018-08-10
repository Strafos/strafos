import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Container } from "semantic-ui-react";

import * as ActionCreators from "./dashboardPageActions";
import * as CommonActions from "../../commonActions";

import NoteForm from "./components/NoteForm/NoteForm";

class DashboardPage extends Component {
  state = { selectedNote: null };

  componentDidMount() {
    this.props.getKeepnotes();
  }

  render() {
    console.log(this.props.keepnoteList);
    return (
      <Container>
        <NoteForm />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  keepnoteList: state.keepnoteList,
});

const mapDispatchToProps = {
  getKeepnotes: ActionCreators.getKeepnotes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
