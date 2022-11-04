import axios from "axios";
import { useEffect, useState } from "react";
import EditModal from "./EditModal";
import { motion } from "framer-motion";

const filledVariants = {
  true: { scale: 1 },
  false: { scale: 0 },
};

const spring = {
  type: "bounce",
  duration: 0.2,
};

function Post({
  originalContent,
  timestamp,
  id,
  alterable = false,
  controls = false,
  isLiked = false,
}) {
  const [content, setContent] = useState("");
  const splitTimestamp = timestamp.split(" ");

  useEffect(() => {
    setContent(originalContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card text-start col-12 col-md-8 col-lg-6 col-xl-5 shadow">
      <div className="card-body">
        <p className="m-0 mb-3">{content}</p>
        {controls && <Controls id={id} isLiked={isLiked} />}
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 blockquote-footer">
            {splitTimestamp[0]}
            <span className="d-none d-sm-inline"> {splitTimestamp[1]}</span>
          </p>
          {alterable && (
            <AuthorControls
              id={id}
              originalContent={originalContent}
              setContent={setContent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AuthorControls({ id, originalContent, setContent }) {
  const handleDelete = async (e) => {
    try {
      const response = await axios.delete("/api/me/posts", {
        data: { post_id: id },
      });
      if (response.status === 200)
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    } catch (err) {
      // HANDLE Error
    }
  };

  const handleEdit = async (e, updatedContent) => {
    try {
      const response = await axios.put("/api/me/posts", {
        post_id: id,
        content: updatedContent,
      });
      if (response.status === 200) setContent(updatedContent);
    } catch (err) {
      // HANDLE Error
    }
  };

  return (
    <div className="d-flex gap-3">
      <button className="btn btn-outline-danger" onClick={handleDelete} id={id}>
        <i className="bi bi-trash" />
      </button>
      <button
        className="btn btn-outline-primary d-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target={`#edit-modal-${id}`}
      >
        <i className="bi bi-pencil" />
      </button>
      <EditModal
        id={id}
        existingContent={originalContent}
        handleEdit={handleEdit}
      />
    </div>
  );
}

function Controls({ id, isLiked }) {
  const [liked, setLiked] = useState(isLiked);

  const likeHandler = async (pLiked) => {
    pLiked = !pLiked;
    try {
      if (pLiked) {
        const response = await axios.post("/api/me/liked", {
          post_id: id,
        });
      } else {
        const response = await axios.delete("/api/me/liked", {
          data: { post_id: id },
        });
      }
    } catch (err) {
      // HANDLE Error
    }
  };

  return (
    <div className="d-flex flex-row gap-3 fs-5 mb-1">
      <div style={{ height: "30px", width: "20px" }}>
        <i
          className="bi bi-heart position-absolute"
          onClick={() => {
            likeHandler(liked);
            setLiked(!liked);
          }}
        />
        <motion.i
          className="bi bi-heart-fill position-absolute text-danger"
          animate={liked ? "true" : "false"}
          variants={filledVariants}
          initial={liked}
          transition={spring}
          onClick={() => {
            likeHandler(liked);
            setLiked(!liked);
          }}
        />
      </div>
      <i className="bi bi-chat-left-dots" />
    </div>
  );
}

export default Post;
