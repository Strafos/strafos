import React, { Component } from "react";
import "./NoteList.css";

import {
  Message,
  Header,
  Divider,
  Icon,
  Menu,
  Input,
  Container,
} from "semantic-ui-react";

import { webClip } from "../utils/api/api";

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
      webClip(urlClip).then(article => {
        this.props.onClip(article.title, atob(article.content));
        // console.log(title);
        // console.log(atob(content));
      });
    }
  };

  render() {
    const { activeItem } = this.state;
    console.log(this.state.urlClip);

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
            placeholder="Add todo..."
            action={{
              icon: "cut",
              onClick: this.handleSubmit,
            }}
            onChange={this.handleUrlChange}
            onKeyPress={this.handleEnter}
            // value={this.state.newTodo}
            // size="small"
            // inverted
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
