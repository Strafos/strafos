import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu, Input } from "semantic-ui-react";

import * as CommonActions from "../../commonActions";

class NavBar extends Component {
  state = {
    activeItem: "home",
    urlClip: null,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleUrlChange = (e, { value }) => this.setState({ urlClip: value });

  handleEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { urlClip } = this.state;
    if (urlClip) {
      this.props.createArticle(urlClip);
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={this.handleItemClick}
        />
        <Menu.Item>
          <Input
            placeholder="Clip article..."
            action={{
              icon: "cut",
              onClick: this.handleSubmit,
            }}
            onChange={this.handleUrlChange}
            onKeyPress={this.handleEnter}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({});

//Unsure if getting articles should be a common action
const mapDispatchToProps = {
  createArticle: CommonActions.createArticle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
