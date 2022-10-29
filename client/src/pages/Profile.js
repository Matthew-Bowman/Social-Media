import axios from "axios";
import React from "react";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

class Profile extends React.Component {
  // INITIALISE posts variable
  state = {
    code: 0,
    username: ``,
    posts: [],
  };

  getData = async () => {
    // GET Data
    const response = await axios.get(
      `http://localhost:3001/api/posts${window.location.search}`
    );

    // SET Data
    const data = response.data;
    const code = data.code;
    const username = data.body.username;
    const posts = data.body.posts;

    if (code === 200) {
      this.setState({ code });
      this.setState({ posts });
      this.setState({ username });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="container-fluid p-0">
        {/* SHOW Navbar */}
        <Navbar />

        {/* SHOW Information */}
        {this.state.code === 200 ? (
          <div className="row mt-5 mx-5 gy-3 d-flex flex-column align-items-center text-center">
            <h1>{this.state.username}'s Posts</h1>
            {this.state.posts.map((item, index) => {
              return <Post content={item.content} timestamp={item.timestamp} />;
            })}
          </div>
        ) : (
          <div className="col-12 mt-5 pt-5 h-100 d-flex align-items-center justify-content-center">
            <div>
              <h1 className="mb-3 display-4 fw-bold">User Not Found</h1>
              <div className="text-center">
                <Link to="/">
                  <button className="btn btn-outline-primary"><span className="fs-2 fw-light">Go Home</span></button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
