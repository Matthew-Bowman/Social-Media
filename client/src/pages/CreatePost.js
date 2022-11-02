import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/me/posts`,
        { content: content },
        {
          withCredentials: true,
        }
      );

      navigate("/")
    } catch (err) {
      // HANDLE Error
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <div className="container py-5 mt-5">
        <form
          className="col-lg-4 mx-auto bg-light shadow p-5 rounded border"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Content
            </label>
            <input
              name="content"
              type="text"
              className="form-control"
              id="content"
              aria-describedby="content"
              onChange={handleChange}
              maxLength="255"
            />
          </div>
          <button
            type="submit"
            id="submit-button"
            className="btn btn-outline-primary px-4"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
