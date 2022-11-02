import CreatePost from "../components/CreatePost";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

function Home() {
  // INITIALISE data state
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `/api/me/posts`,
        null,
        { withCredentials: true }
      );
      setPosts(response.data.body.posts);
    } catch (err) {
      // HANDLE Error
    }
  };

  const loadUsername = async () => {
    try {
      const response = await axios.get(`/api/me`, null, {
        withCredentials: true,
      });
      setUsername(response.data.body.user.username);
    } catch (err) {
      // HANDLE Error
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsername();
  }, []);

  return (
    <div className="container-fluid p-0 py-5">
      <div className="row mt-5 mx-5 gy-3 d-flex flex-column align-items-center text-center">
        <h1>Hello, {username}</h1>
        <CreatePost />
        {posts.map((item, index) => {
          return (
            <Post
              originalContent={item.content}
              timestamp={item.timestamp}
              id={item.post_id}
              alterable={true}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
