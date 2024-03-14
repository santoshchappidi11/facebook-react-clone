import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig/index.js";
import fbLogo from "../../images/facebook-logo.svg";
import connectLogo from "../../images/connect_transparent.png";

const Register = () => {
  const navigateTo = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(userData);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.number &&
      userData.password &&
      userData.confirmPassword
    ) {
      if (userData.password == userData.confirmPassword) {
        try {
          const response = await api.post("/register", { userData });

          if (response.data.success) {
            toast.success(response.data.message);
            setUserData({
              firstName: "",
              lastName: "",
              email: "",
              number: "",
              password: "",
              confirmPassword: "",
            });
            navigateTo("/");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Password and Confirm Password does not match!");
      }
    } else {
      toast.error("Please fill all the details!");
    }
  };

  return (
    <div id="register-screen">
      <div id="logo">
        {/* <h2>connect</h2> */}
        <div id="img">
          <img src={connectLogo} alt="logo" />
        </div>
      </div>
      <div id="register">
        <div id="register-header">
          <h2>Create a new account</h2>
          <p>It's quick and easy.</p>
        </div>
        <div id="register-body">
          <form onSubmit={handleRegisterSubmit}>
            <div id="fields-1">
              <input
                type="text"
                name="firstName"
                placeholder="Enter Name"
                onChange={handleChangeValues}
                value={userData.firstName}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter Surname"
                onChange={handleChangeValues}
                value={userData.lastName}
              />
            </div>
            <div id="fields-2">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChangeValues}
                value={userData.email}
              />
            </div>
            <div id="fields-3" className="common-fields">
              <input
                type="number"
                name="number"
                placeholder="Enter Number"
                onChange={handleChangeValues}
                value={userData.number}
              />
            </div>
            <div id="fields-4" className="common-fields">
              <input
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleChangeValues}
                value={userData.password}
              />
            </div>
            <div id="fields-5" className="common-fields">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChangeValues}
                value={userData.confirmPassword}
              />
            </div>
            <p>
              People who use our service may have uploaded your contact
              information to Connect. Learn more.
            </p>
            <p>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <button type="submit">Sign Up</button>
          </form>
          <div id="sign-in">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigateTo("/")}>Login for Connect</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
