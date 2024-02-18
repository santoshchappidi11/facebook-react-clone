import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import CreateStory from "./components/stories/CreateStory";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import NewUserProfile from "./components/Profile/NewUserProfile";
import SinglePost from "./components/Posts/SinglePost";
import FriendProfile from "./components/FriendProfile/FriendProfile";
import ViewStory from "./components/stories/ViewStory";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create-story" element={<CreateStory />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search/:searchId" element={<Search />} />
        <Route exact path="/new-user-profile" element={<NewUserProfile />} />
        <Route exact path="/single-post/:postId" element={<SinglePost />} />
        <Route
          exact
          path="/friend-profile/:profileId"
          element={<FriendProfile />}
        />
        <Route exact path="/view-story/:storyUserId" element={<ViewStory />} />
      </Routes>
    </div>
  );
}

export default App;
