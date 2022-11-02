import { useEffect, useState } from "react";

function EditModal({ id, existingContent, handleEdit }) {
  const [content, setContent] = useState("");

  const handleChange = async (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setContent(existingContent);
  }, []);

  return (
    <div
      className="modal fade"
      id={`edit-modal-${id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`edit-modal-${id}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`edit-modal-${id}-label`}>
              Edit Post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <div className="mb-3">
              <span className="fw-bold">Original Post: "</span>
              {existingContent}
              <span className="fw-bold">"</span>
            </div>
            <input
              className="form-control"
              type="text"
              maxLength="255"
              onChange={handleChange}
              value={content}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-primary px-4"
              data-bs-dismiss="modal"
              onClick={(e) => handleEdit(e, content)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
