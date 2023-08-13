import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div id="login-screen">
      <div id="logo">
        <div id="img">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt="logo"
          />
        </div>
      </div>
      <div id="login">
        <div id="login-header">
          <h2>Log in to Facebook</h2>
        </div>
        <div id="login-body">
          <form>
            <div id="fields-1">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
              />
            </div>
            <div id="fields-2">
              <input
                type="password"
                name="password"
                placeholder="New Password"
              />
            </div>
            <p>
              By clicking Sign In, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </p>
            <button>Log in</button>
            <div id="sign-up">
              <p>Forgotten account?</p>
              <span>Sign up for Facebook</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
