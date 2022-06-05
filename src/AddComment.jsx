import React, { Component } from "react";
import { getHeaders } from "./utils";

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "Add a comment...",
      textInput: React.createRef(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postCommentToDb = this.postCommentToDb.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  componentDidMount() {}

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleSubmit(e) {
    this.state.textInput.current.focus();
    var commentText = this.state.inputValue;
    var post_id = this.props.postId;
    e.preventDefault();
    this.postCommentToDb(commentText, post_id);
  }

  postCommentToDb(comment_text, postid) {
    const postData = {
      post_id: this.props.postId,
      text: comment_text,
    };

    fetch("api/comments/", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.refreshPost();
      });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div className="add-comment">
        <i className="far fa-smile"></i>
        <input
          type="text"
          ref={this.state.textInput}
          onClick={this.focusTextInput}
          onChange={this.handleChange}
          defaultValue={this.state.inputValue}
        />
        <button
          className="postButton"
          onClick={this.handleSubmit}
          type="submit"
        >
          Post
        </button>
      </div>
    );
  }
}
