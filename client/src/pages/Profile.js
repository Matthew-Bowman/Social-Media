import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Post from "../components/Post";
import PostPlaceholder from "../components/PostPlaceholder";

const Profile = () => {
  // INITIALISE data state
  const [data, setData] = useState([]);
  const [code, setCode] = useState(-1);
  const [loadedData, setLoadedData] = useState(false);

  const params = useParams();
  const location = useLocation();

  const loadData = async () => {
    try {
      const response = await axios.get(
        `/api/posts?username=${params.username}`
      );
      setData(response.data.body);
      setCode(response.data.code);
      setLoadedData(true);
    } catch (err) {
      setCode(0);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="container-fluid p-0">
      {/* SHOW Page Loading */}

      {loadedData ? (
        <>
          {/* SHOW Information */}
          {code === 200 ? (
            <div className="row mt-5 mx-5 gy-3 d-flex flex-column align-items-center text-center">
              <h1>{data.username}'s Posts</h1>
              {data.posts.map((item, index) => {
                return (
                  <Post
                    originalContent={item.content}
                    timestamp={item.timestamp}
                    key={index}
                    id={item.post_id}
                    controls={true}
                    isLiked={item.liked}
                  />
                );
              })}
            </div>
          ) : (
            <div className="col-12 mt-5 pt-5 h-100 d-flex align-items-center justify-content-center">
              <div>
                <h1 className="mb-3 display-4 fw-bold">User Not Found</h1>
                <div className="text-center">
                  <Link to="/">
                    <button className="btn btn-outline-primary">
                      <span className="fs-2 fw-light">Go Home</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="d-flex flex-column align-items-center mt-5 pt-5">
          <h1
            tabIndex="-1"
            className="btn btn-primary disabled placeholder col-2 mb-3"
            aria-hidden="true"
          ></h1>
          <PostPlaceholder />
        </div>
      )}
    </div>
  );
};

export default Profile;
