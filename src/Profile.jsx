import React, { Component } from "react";
import { getHeaders } from "./utils";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      imageUrl: "",
    };
    this.getProfile();
  }

  componentDidMount() {}

  getProfile() {
    const url = "https://photo-app-secured.herokuapp.com/api/profile";
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userName: data.username,
          imageUrl: data.thumb_url,
        });
      });
  }

  render() {
    return (
      <header style={headerStyle}>
        <div>
          <img
            className="pic"
            src={this.state.imageUrl}
            alt={"profile picture for " + this.state.userName}
          />
          <p>{this.state.userName}</p>
        </div>
        <div>
          <p>
            <a href="#"> Switch </a>{" "}
          </p>
        </div>
      </header>
    );
  }
}

const headerStyle = {
  display: "flex",
};
