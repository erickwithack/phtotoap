import React, { Component } from "react";

export default class Navbar extends Component {
  componentDidMount() {}
  render() {
    return (
      <nav className="main-nav">
        <h1>{this.props.title}</h1>
        <div
          className="links"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {this.props.username}
          <a
            style={{ marginLeft: "15px" }}
            href="https://photo-app-secured.herokuapp.com/login"
          >
            Api Docs
          </a>
          <a
            style={{ marginLeft: "15px" }}
            href="https://photo-app-secured.herokuapp.com/login"
          >
            {" "}
            sign out
          </a>
        </div>
      </nav>
    );
  }
}
