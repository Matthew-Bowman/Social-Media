import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
axios.defaults.withCredentials = true;

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const sendLogout = async () => {
    const res = await axios.post("http://localhost:3001/api/me/logout", null, {
      withCredentials: true,
    });

    if(res.status === 200) {
      return res;
    }

    return new Error("Unable to logout, please try again!")
  };

  const handleLogout = () => {
    sendLogout().then(() => dispatch(authActions.logout()));
  };

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
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle align-items-center d-flex gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
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
