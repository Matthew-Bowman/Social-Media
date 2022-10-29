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
          <div className="col-4 d-flex justify-content-end">
            <div class="dropdown">
              <button
                class="btn btn-outline-light dropdown-toggle align-items-center d-flex gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signup">
                    <span>Signup</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
