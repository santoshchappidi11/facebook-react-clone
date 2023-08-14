import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigateTo = useNavigate();

  return (
    <div id="register-screen">
      <div id="logo">
        <div id="img">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt="logo"
          />
        </div>
      </div>
      <div id="register">
        <div id="register-header">
          <h2>Create a new account</h2>
          <p>It's quick and easy.</p>
        </div>
        <div id="register-body">
          <form>
            <div id="fields-1">
              <input type="text" name="name" placeholder="Enter Name" />
              <input type="text" name="surname" placeholder="Enter Surname" />
            </div>
            <div id="fields-2">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
              />
            </div>
            <div id="fields-3">
              <input
                type="password"
                name="password"
                placeholder="New Password"
              />
            </div>
            <p>
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
            <p>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button>Sign Up</button>
            <div id="sign-in">
              <p>
                Already have an account?{" "}
                <span onClick={() => navigateTo("/login")}>
                  Login for Facebook
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
