function PostPlaceholder({ alterable = false }) {
  return (
    <div className="card text-start col-12 col-md-8 col-lg-6 col-xl-5 shadow">
      <div className="card-body">
        <p className="card-text placeholder-wave">
          <span className="placeholder me-1 col-7"></span>
          <span className="placeholder me-1 col-4"></span>
          <span className="placeholder me-1 col-4"></span>
          <span className="placeholder me-1 col-6"></span>
          <span className="placeholder me-1 col-8"></span>
        </p>
        <div className="d-flex justify-content-between">
          <p className="placeholder-glow col-3">
            <span className="placeholder me-1 col-12"></span>
          </p>
          {alterable && (
            <div className="d-flex gap-3 col-4">
              {/*eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
              <a
                href=""
                tabIndex="-1"
                className="btn btn-danger disabled placeholder col-6"
              ></a>
              {/*eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
              <a
                href="#"
                tabIndex="-1"
                className="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPlaceholder;
