import React, { Component } from "react";
import FollowButton from "./FollowButton";

export default class Suggestion extends Component {
  render() {
    const sugg = this.props.model;
    return (
      <section key={sugg.id}>
        <img
          className="pic"
          src={sugg.thumb_url}
          alt={"suggestion for " + sugg.username}
        />
        <p> {sugg.username}</p>
        <FollowButton followingId={sugg.id} />
      </section>
    );
  }
}
