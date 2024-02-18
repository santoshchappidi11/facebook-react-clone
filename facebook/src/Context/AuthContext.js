import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import api from "../ApiConfig";
// import { useNavigate } from "react-router-dom";

export const AuthContexts = createContext();

const initialState = {
  currentUser: null,
  followings: null,
  followers: null,
  profileImgUpdated: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };

    case "LOGOUT":
      return { ...state, currentUser: null };

    case "FOLLOWINGS":
      return { ...state, followings: action.payload };

    case "FOLLOWERS":
      return { ...state, followers: action.payload };

    case "PROFILE":
      return { ...state, profileImgUpdated: action.payload };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log(state);

  const Login = (userData) => {
    localStorage.setItem("Token", JSON.stringify(userData.token));

    dispatch({
      type: "LOGIN",
      payload: userData.user,
    });
  };

  const Logout = () => {
    localStorage.removeItem("Token");

    dispatch({
      type: "LOGOUT",
    });
  };

  const ProfileChanged = (image) => {
    dispatch({
      type: "PROFILE",
      payload: image,
    });
  };

  const UserFollowings = (userAllFollowings) => {
    dispatch({
      type: "FOLLOWINGS",
      payload: userAllFollowings,
    });
  };

  const UserFollowers = (userAllFollowers) => {
    dispatch({
      type: "FOLLOWERS",
      payload: userAllFollowers,
    });
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-current-user", { token });

          if (response.data.success) {
            dispatch({
              type: "LOGIN",
              payload: response.data.user,
            });
            dispatch({
              type: "FOLLOWINGS",
              payload: response.data.followings,
            });
            dispatch({
              type: "FOLLOWERS",
              payload: response.data.followers,
            });
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getCurrentUser();
  }, []);

  return (
    <AuthContexts.Provider
      value={{
        state,
        Login,
        Logout,
        dispatch,
        UserFollowings,
        UserFollowers,
        ProfileChanged,
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
