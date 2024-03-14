import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";
import fbLogo from "../../images/facebook-logo.svg";
import connectLogo from "../../images/connect_transparent.png";

const Login = () => {
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { Login, UserFollowings, UserFollowers } = useContext(AuthContexts);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("Token"));

    if (!userToken) {
    }
  }, []);

  const handleChangeValues = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const response = await api.post("/login", { userData });

        if (response.data.success) {
          Login(response.data);
          UserFollowings(response.data.followings);
          UserFollowers(response.data.followers);
          toast.success(response.data.message);
          navigateTo("/new-user-profile");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div id="login-screen">
      <div id="logo">
        {/* <h2>connect</h2> */}
        <div id="img">
          <img src={connectLogo} alt="logo" />
        </div>
      </div>
      <div id="login">
        <div id="login-header">
          <h2>Log in to Connect</h2>
        </div>
        <div id="login-body">
          <form onSubmit={handleLoginSubmit}>
            <div id="fields-1">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={userData.email}
                onChange={handleChangeValues}
              />
            </div>
            <div id="fields-2">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={userData.password}
                onChange={handleChangeValues}
              />
            </div>
            <p>
              By clicking Sign In, you agree to our Terms, Privacy Policy and
              Cookies Policy.
            </p>
            <button type="submit">Log in</button>
            <div id="sign-up">
              <p>Forgotten account?</p>
              <span onClick={() => navigateTo("/register")}>
                Sign up for Connect
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
