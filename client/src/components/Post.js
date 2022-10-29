function Post({ content, timestamp }) {
  return (
    <div className="card text-start col-12 col-md-8 col-lg-6 col-xl-5 shadow">
      <div className="card-body">
        <p className="m-0 mb-3">{content}</p>
        <p className="m-0 blockquote-footer">{timestamp}</p>
      </div>
    </div>
  );
}

export default Post;
