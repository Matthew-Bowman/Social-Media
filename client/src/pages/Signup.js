import Alert from "../components/Alert";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill out all the fields!");
    } else {
      document.querySelector(`#submit-button`).classList.add("disabled");

      axios
        .post(`/api/users/create`, {
          username: username,
          password: password,
        })
        .then(() => {
          setError(null);
          navigate(`/login`);
        })
        .catch((err) => {
          document.querySelector(`#submit-button`).classList.remove("disabled");
          console.log(err);
          switch (err.response.status) {
            case 500:
              setError("Internal Server Error, Please try again");
              break;
            case 413:
              setError("Max Length for Username is 50 Characters");
              break;
            case 409:
              setError("Invalid Username");
              break;
            case 422:
              setError("Please fill out all the fields");
              break;
            default:
              setError("Something went wrong, please try again");
              break;
          }
        });
    }
  };

  return (
    <div>
      <div className="container py-5 mt-5">
        <h1 className="mx-auto text-center">Sign Up</h1>
        <form
          className="col-lg-4 mx-auto my-3 bg-light shadow p-5 rounded border"
          onSubmit={handleSubmit}
        >
          {error && <Alert text={error} />}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" id="submit-button" className="btn btn-primary">
            Create Account
          </button>
        </form>
        <h3 className="text-center">Already have an account?</h3>
        <div className="text-center">
          <Link to="/login" className="btn btn-outline-dark mt-1">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
