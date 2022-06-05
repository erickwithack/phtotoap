import React, { Component } from "react";
import { getHeaders } from "./utils";
import Suggestion from "./Suggestion";

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
    this.getSuggestions();
  }

  getSuggestions() {
    const url = "https://photo-app-secured.herokuapp.com/api/suggestions";
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ suggestions: data });
      });
  }

  componentDidMount() {
    console.log("Suggestions component mounted");
  }

  render() {
    return (
      <div className="suggestions">
        <p className="suggestion-text">Suggestions for you</p>
        {this.state.suggestions.map((sugg) => {
          return <Suggestion key={sugg.id} model={sugg} />;
        })}
      </div>
    );
  }
}
