import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";

const Search = () => {
  const { state } = useContext(AuthContexts);
  const [searchUser, setSearchUser] = useState({});

  console.log(searchUser, "search user here");

  useEffect(() => {
    const getSearchResults = async () => {
      if (state?.searchId) {
        try {
          const response = await api.post("/get-search-result", {
            userId: state.searchId,
          });

          if (response.data.success) {
            setSearchUser(response.data.user);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getSearchResults();
  }, [state]);

  return (
    <div id="search">
      <Navbar />
      <div id="left">
        <h3>Filters</h3>
        {/* <div className="left-sec">
        </div> */}
        <div className="left-sec">
          <i class="fa-solid fa-photo-film fa-lg"></i>
          <h4>All</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-comment fa-lg"></i>
          <h4>Post</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-user-group fa-lg"></i>
          <h4>People</h4>
        </div>
        <div className="left-sec">
          <i class="fa-regular fa-image fa-lg"></i>
          <h4>Photos</h4>
        </div>
        <div className="left-sec">
          <i class="fa-brands fa-youtube fa-lg"></i>
          <h4>Videos</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-store fa-lg"></i>
          <h4>MarketPlace</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-flag fa-lg"></i>
          <h4>Pages</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-location-dot fa-lg"></i>
          <h4>Places</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-users fa-lg"></i>
          <h4>Groups</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-calendar-plus fa-lg"></i>
          <h4>Events</h4>
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
                <div className="details">
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
                <div className="details">
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
                <div className="details">
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
                <div className="details">
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
                <div className="details">
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
                <div className="details">
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
                <div className="details">
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
