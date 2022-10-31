import { Link } from "react-router-dom";

function CreatePost() {
  return (
    <div className="card text-start col-12 col-md-8 col-lg-6 col-xl-5 shadow text-center p-2">
      <div className="card-body">
        <p className="m-0 mb-3">Feel like posting something?</p>
        <Link to="/create">
          <button className="btn btn-outline-primary">Create Post</button>
        </Link>
      </div>
    </div>
  );
}

export default CreatePost;
