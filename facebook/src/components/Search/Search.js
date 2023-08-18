import React from "react";
import "./Search.css";
import findfriends from "./../../images/findfriends.jpg";
import welcome from "./../../images/welcome.jpg";
import memories from "./../../images/memories.jpg";
import saved from "./../../images/saved.jpg";
import groups from "./../../images/groups.jpg";
import video from "./../../images/video.jpg";
import market from "./../../images/market.jpg";
import feeds from "./../../images/feeds.jpg";
import events from "./../../images/events.jpg";
import ads from "./../../images/ads.jpg";
import Navbar from "../Navbar/Navbar";

const Search = () => {
  return (
    <div id="search">
      <Navbar />
      <div id="left">
        <div className="left-sec">
          <i
            class="fa-solid fa-circle-user fa-xl"
            style={{ marginRight: "5px" }}
          ></i>
          <h4 style={{ marginLeft: "5px" }}>Santosh Chappidi</h4>
        </div>
        <div className="left-sec">
          <img src={findfriends} alt="left" />
          <h4>Find Friends</h4>
        </div>
        <div className="left-sec">
          <img src={welcome} alt="left" />
          <h4>Welcome</h4>
        </div>
        <div className="left-sec">
          <img src={memories} alt="left" />
          <h4>Memories</h4>
        </div>
        <div className="left-sec">
          <img src={saved} style={{ marginLeft: "5px" }} alt="left" />
          <h4 style={{ marginLeft: "5px" }}>Saved</h4>
        </div>
        <div className="left-sec">
          <img src={groups} alt="left" />
          <h4>Groups</h4>
        </div>
        <div className="left-sec">
          <img src={video} alt="left" />
          <h4>Video</h4>
        </div>
        <div className="left-sec">
          <img src={market} alt="left" />
          <h4>Market Place</h4>
        </div>
        <div className="left-sec">
          <img src={feeds} alt="left" />
          <h4>feeds</h4>
        </div>
        <div className="left-sec">
          <img src={events} alt="left" />
          <h4>Events</h4>
        </div>
        <div className="left-sec">
          <img src={ads} alt="left" />
          <h4>Adds Manager</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-angle-down" style={{ marginRight: "5px" }}></i>
          <h4 style={{ marginLeft: "5px" }}>See more</h4>
        </div>
      </div>
      <div id="middle">
        <div id="search-main">
          <div id="search-header">
            <h2>Search Results</h2>
          </div>
          <div id="search-results">
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="search-result">
              <div className="search-left">
                <div className="img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
                    alt="profle"
                  />
                </div>
                <div className="deatils">
                  <h4>M.S Dhoni</h4>
                  <p>Cricket India</p>
                </div>
              </div>
              <div className="follow">
                <button>Add Friend</button>
              </div>
            </div>
            <div className="see-more">
              <p>See more..</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
