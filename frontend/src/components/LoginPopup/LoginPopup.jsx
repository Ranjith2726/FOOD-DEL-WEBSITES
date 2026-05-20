import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : window.location.origin;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError("");
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const newUrl =
      currState === "Login"
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Server error. Please try again."
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>

          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="login-popup-close"
          >
            ×
          </button>
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            minLength="6"
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setCurrState("Sign Up");
                setError("");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
                setError("");
              }}
            >
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;