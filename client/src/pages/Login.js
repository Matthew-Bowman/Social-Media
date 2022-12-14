import Alert from "../components/Alert";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

let state = {
  username: "",
  password: "",
  errorText: "",
};

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.username === "" || state.password === "") {
      state.errorText = "Please fill out all the fields!";
      setError(true);
    } else {
      setError(false);
      document.querySelector(`#submit-button`).classList.add("disabled");

      axios
        .post(`/api/users/authorize`, {
          username: state.username,
          password: state.password,
        })
        .then((result) => {
          dispatch(authActions.login());
          navigate("/");
        })
        .catch((err) => {
          document.querySelector(`#submit-button`).classList.remove("disabled");
          console.log(err);
          switch (err.response.status) {
            case 500:
              state.errorText = "Internal Server Error";
              setError(true);
              break;
            case 413:
              state.errorText = "Username maximum is 50 characters";
              setError(true);
              break;
            case 409:
              state.errorText = "Username already exists!";
              setError(true);
              break;
            case 404:
              state.errorText = "Please fill out all the fields!";
              setError(true);
              break;
            default:
              state.errorText = "Something went wrong, please try again!";
              setError(true);
              break;
          }
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    state[name] = value;
  };

  return (
    <div>
      <div className="container py-5 mt-5">
        <h1 className="mx-auto text-center">Login</h1>
        <form
          className="col-lg-4 mx-auto my-3 bg-light shadow p-5 rounded border"
          onSubmit={handleSubmit}
        >
          {error ? <Alert text={state.errorText} /> : null}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="submit-button" className="btn btn-primary">
            Login
          </button>
        </form>
        <h3 className="text-center">Don't have an account?</h3>
        <div className="text-center">
          <Link to="/signup" className="btn btn-outline-dark mt-1">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
