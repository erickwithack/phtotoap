import React from "react";
import { getHeaders } from "./utils";

class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
    this.getStoriesFromServer();
  }

  getStoriesFromServer() {
    const url = "https://photo-app-secured.herokuapp.com/api/stories/";
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          stories: data,
        });
      });
  }

  componentDidMount() {
    console.log("Stories component mounted");
  }

  render() {
    return (
      <header className="stories">
        {this.state.stories.map((story) => {
          return (
            <div key={story.id}>
              <img
                className="pic"
                src={story.user.thumb_url}
                alt={"Story for " + story.user.username}
              />

              <p>{story.user.username}</p>
            </div>
          );
        })}
      </header>
    );
  }
}

export default Stories;
