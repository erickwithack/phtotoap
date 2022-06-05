import React, { Component } from "react";
import { getHeaders } from "./utils";
import "./index.css";

export default class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "follow",
      idUnfollow: null,
    };
    this.toggleFollow = this.toggleFollow.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  componentDidMount() {}

  toggleFollow() {
    if (!this.state.idUnfollow) {
      this.follow();
    } else {
      this.unfollow();
    }
  }

  follow() {
    const following_id = this.props.followingId;
    const postData = {
      user_id: following_id,
    };

    let url = "https://photo-app-secured.herokuapp.com/api/following/";
    fetch(url, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          buttonText: "unfollow",
          idUnfollow: data.id,
        });
      });
  }

  unfollow() {
    const following_id = this.state.idUnfollow;
    const deleteUrl = `https://photo-app-secured.herokuapp.com/api/following/${following_id}`;

    fetch(deleteUrl, {
      headers: getHeaders(),
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          buttonText: "follow",
        });
      });
  }

  render() {
    const followId = this.props.followingId;
    return (
      <button
        id="followButton"
        className="follow"
        role="switch"
        aria-checked={followId ? true : false}
        aria-label="follow/unfollow"
        onClick={this.toggleFollow}
      >
        {this.state.buttonText}
      </button>
    );
  }
}
