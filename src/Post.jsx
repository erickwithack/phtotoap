import React, { Component } from "react";
import { getHeaders } from "./utils";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import AddComment from "./AddComment";

import Modal from "./Modal";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.model,
      isOpen: false,
    };
    this.refreshPostData = this.refreshPostData.bind(this);
    this.displayComments = this.displayComments.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {}

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  displayComments() {
    const comments = this.state.post.comments;

    if (comments.length === 0) {
      return "";
    }

    if (comments.length === 1) {
      const comment = comments[0];
      return (
        <p>
          <span>
            <strong style={{ marginRight: "15px" }}>
              {comment.user.username}
            </strong>
            {comment.text}
          </span>
        </p>
      );
    }

    if (comments.length > 1) {
      return (
        <>
          <button className="button-default" onClick={this.toggleModal}>
            View all {comments.length} comments{" "}
          </button>

          <Modal show={this.state.isOpen} onClose={this.toggleModal}>
            {comments.map((comment) => {
              return (
                <p key={comment.id}>
                  <span>
                    <strong style={{ marginRight: "15px" }}>
                      {comment.user.username}
                    </strong>
                    {comment.text}
                  </span>
                </p>
              );
            })}
          </Modal>
        </>
      );
    }
  }

  refreshPostData() {
    const url = "api/posts/" + this.state.post.id;
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          post: data,
        });
      });
  }

  render() {
    const post = this.state.post;
    return (
      <section className="card" key={post.id}>
        <div className="header">
          <h3>{post.user.username}</h3>
          <i className="fa fa-dots"></i>
        </div>
        <img
          src={post.image_url}
          alt={"Image posted by " + post.user.username}
          width="300"
          height="300"
        />
        <div className="info">
          <div>
            <div className="buttons">
              <div className="like-coment-send">
                <LikeButton
                  likeId={post.current_user_like_id}
                  postId={post.id}
                  refreshPost={this.refreshPostData}
                />
                <i className="far fa-comment" />
                <i className="far fa-paper-plane" />
              </div>

              <BookmarkButton
                bookmarkId={post.current_user_bookmark_id}
                postId={post.id}
                refreshPost={this.refreshPostData}
              />
            </div>

            <p>
              <span>
                <strong style={{ marginRight: "15px" }}>
                  {post.user.username}
                </strong>
                {post.caption}
              </span>
            </p>
            {this.displayComments()}
            <AddComment postId={post.id} refreshPost={this.refreshPostData} />
          </div>
        </div>
      </section>
    );
  }
}
