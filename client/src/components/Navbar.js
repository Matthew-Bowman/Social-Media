import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
import { useState } from "react";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const sendLogout = () => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/me/logout")
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  };

  const handleLogout = () => {
    sendLogout()
      .then(() => dispatch(authActions.logout()))
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            navigate("/login");
            break;
          case 422:
            navigate("/login");
            break;
          default:
            navigate("/login");
            break;
        }
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`profile/${username}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 fw-bold fs-3" to="/">
            <span>Social</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <form
              className="d-flex gap-2 my-2 my-lg-0 mx-auto"
              role="search"
              onSubmit={handleSearch}
            >
              <div>
                <input
                  id="username-input"
                  className="form-control px-3"
                  type="search"
                  placeholder="Search Users"
                  aria-label="Search Users"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>

            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle align-items-center d-flex gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-sm-end">
                {!isLoggedIn && (
                  <>
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
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <li>
                      <span className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
