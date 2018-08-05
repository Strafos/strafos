import React, { Component } from "react";

import { Menu, Input } from "semantic-ui-react";

import * as API from "../utils/api";

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
    console.log(urlClip);
    if (urlClip) {
      API.webClip(urlClip).then(article => {
        this.props.onClip(article.title, article.content);
      });
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

export default NavBar;
