import React, { Component } from "react";
import { getHeaders } from "./utils";
import Post from "./Post";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.getPostsFromServer();
  }

  getPostsFromServer() {
    const url = "https://photo-app-secured.herokuapp.com/api/posts/";
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ posts: data });
      });
  }

  componentDidMount() {}

  render() {
    return (
      <div id="posts">
        {this.state.posts.map((post) => {
          return <Post key={post.id} model={post} />;
        })}
      </div>
    );
  }
}
