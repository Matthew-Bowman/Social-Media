import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar bg-dark navbar-dark py-2">
        <div className="container-fluid">
          <div className="col-4">
            <Link className="navbar-brand mb-0 fw-bold fs-3" to="/">
              <span>Social</span>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <form
              className="d-flex gap-2 mx-auto"
              role="search"
              action="/profile"
            >
              <div>
                <input
                  id="username-input"
                  className="form-control px-3"
                  type="search"
                  placeholder="Search Users"
                  aria-label="Search Users"
                  name="username"
                />
              </div>
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="col-4"></div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
