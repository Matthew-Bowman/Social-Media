import axios from "axios";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";

function Post({ originalContent, timestamp, id, alterable = false }) {
  const [content, setContent] = useState("");

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/me/posts",
        { data: { post_id: id } }
      );
      if (response.status === 200)
        e.target.parentElement.parentElement.parentElement.parentElement.remove();
    } catch (err) {
      // HANDLE Error
    }
  };

  const handleEdit = async (e, updatedContent) => {
    try {
      const response = await axios.put("http://localhost:3001/api/me/posts", {
        post_id: id,
        content: updatedContent,
      });
      if (response.status === 200) setContent(updatedContent);
    } catch (err) {
      // HANDLE Error
    }
  };

  useEffect(() => {
    setContent(originalContent);
  }, []);

  return (
    <div className="card text-start col-12 col-md-8 col-lg-6 col-xl-5 shadow">
      <div className="card-body">
        <p className="m-0 mb-3">{content}</p>
        <div className="d-flex justify-content-between">
          <p className="m-0 blockquote-footer">{timestamp}</p>
          {alterable && (
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
                id={id}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-primary px-3"
                data-bs-toggle="modal"
                data-bs-target={`#edit-modal-${id}`}
              >
                Edit
              </button>
              <EditModal
                id={id}
                existingContent={originalContent}
                handleEdit={handleEdit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
