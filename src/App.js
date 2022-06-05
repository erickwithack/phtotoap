import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { getHeaders } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
    this.getProfileFromServer();
  }

  componentDidMount() {}

  getProfileFromServer() {
    const url = "https://photo-app-secured.herokuapp.com/api/profile";
    fetch(url, {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user: data });
      });
  }

  render() {
    return (
      <div>
        <Navbar title="Photo App" username={this.state.user.username} />

        <aside>
          <Profile />
          <Suggestions />
        </aside>

        <main className="content">
          <Stories />
          <Posts />
        </main>
      </div>
    );
  }
}

export default App;
