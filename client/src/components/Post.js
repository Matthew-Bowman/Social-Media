function Post({ content, timestamp, id, alterable = false }) {
  console.log(`----------`);
  console.log(id);
  console.log(alterable);
  console.log(`----------`)
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
