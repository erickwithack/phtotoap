import React, { Component } from "react";
import { getHeaders } from "./utils";

export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.toggleLike = this.toggleLike.bind(this);
    this.createLike = this.createLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount() {}

  toggleLike() {
    if (this.props.likeId) {
      this.removeLike();
    } else {
      this.createLike();
    }
  }

  createLike() {
    const url = "https://photo-app-secured.herokuapp.com/api/posts/likes/";
    const postData = {
      post_id: this.props.postId,
    };

    fetch(url, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.refreshPost();
      });
  }

  removeLike() {
    const url =
      "https://photo-app-secured.herokuapp.com/api/posts/likes/" +
      this.props.likeId;
    fetch(url, {
      headers: getHeaders(),
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.refreshPost();
      });
  }

  render() {
    const likeId = this.props.likeId;
    const heart = (likeId ? "fas" : "far") + " fa-heart";
    return (
      <button
        role="switch"
        className="like"
        aria-checked={likeId ? true : false}
        onClick={this.toggleLike}
        aria-label="Like / Unlike"
      >
        <i className={heart}></i>
      </button>
    );
  }
}
