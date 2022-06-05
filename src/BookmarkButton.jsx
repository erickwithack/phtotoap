import React, { Component } from "react";
import { getHeaders } from "./utils";

export default class BookmarkButton extends Component {
  constructor(props) {
    super(props);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.createBookmark = this.createBookmark.bind(this);
    this.removeBookmark = this.removeBookmark.bind(this);
  }

  componentDidMount() {}

  toggleBookmark() {
    if (this.props.bookmarkId) {
      this.removeBookmark();
    } else {
      this.createBookmark();
    }
  }

  createBookmark() {
    const url = "api/bookmarks/";
    const postData = {
      post_id: this.props.postId,
    };
    console.log("create Bookmark!");

    fetch(url, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.refreshPost();
      });
  }

  removeBookmark() {
    var url =
      "https://photo-app-secured.herokuapp.com/api/bookmarks/" +
      this.props.bookmarkId;
    fetch(url, {
      headers: getHeaders(),
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.refreshPost();
      });
  }

  render() {
    const bookmarkId = this.props.bookmarkId;
    const bookmarkClass = (bookmarkId ? "fas" : "far") + " fa-bookmark";
    return (
      <button
        className="bookmark"
        role="switch"
        aria-checked={bookmarkId ? true : false}
        onClick={this.toggleBookmark}
        aria-label="Bookmark / UnBookmark"
      >
        <i className={bookmarkClass}></i>
      </button>
    );
  }
}
