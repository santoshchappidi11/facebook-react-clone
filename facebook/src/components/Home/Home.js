import React from "react";
import "./Home.css";
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
import like from "./../../images/like.JPG";
import Navbar from "../Navbar/Navbar";
// import heart from "./../../images/heart.JPG";

const Home = () => {
  return (
    <div id="home">
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
        <div id="story">
          <i class="fa-solid fa-plus"></i>
          <div id="create-story">
            <h3>Create Story</h3>
            <p>Share a photo or write something.</p>
          </div>
        </div>
        <div id="post-something">
          <div id="top">
            <i class="fa-solid fa-circle-user fa-2x"></i>
            <input type="text" placeholder="What's on your mind, Santosh?" />
          </div>
          <div id="down">
            <div>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png"
                alt="video"
              />
              <p>Live video</p>
            </div>
            <div>
              <img
                src="	https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                alt="post"
              />
              <p>Photo/video</p>
            </div>
            <div>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                alt="activity"
              />
              <p>Feeling/activity</p>
            </div>
          </div>
        </div>
        <div id="posts">
          <div className="post">
            <div className="postsec-1">
              <div className="post-user">
                <div className="post-img">
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUQFRgVERIYGBgZGB0YGhkaGBocFhoZGBkZGRgfGBkcJS4lHB44HxkYJjonLC8xNTU2HCQ7QDs1QC40NTEBDAwMEA8QHxISHzQoJSsxNjQ2MTQ0NDE2NDQ0NDQ0NDQ0MTE0NTQ0NDQ0NDQ3NDQ0NDQ0NDQ9NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcEBQgBAwL/xABGEAACAQMBBgMFBQUFBAsAAAABAgADBBEFBhIhMUFRByJhEzJScYEUQmKRoSNygpKiFTOxwdEkk7LhFhclRFNjc4OEwtL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/xAAlEQEBAQACAQUAAgIDAAAAAAAAAQIDESEEEjFBUSKBFFITIzL/2gAMAwEAAhEDEQA/AKjiInruJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEQICJcWy3hpp97QSuLmvUVhxA3E3W6hgASGB4czJB/wBUmm9q3+9/5TPfUZl68re2ufZ9KNJqjBUVnY8lUFmPyA4zoWy8LNNpNvGk9THJajlk/lGM/XMl1lYUrdd2hSSmvwoqqPyUCV16qfUT7XNFrsXqNXBSxrYPVk3B/XifvUNib62XfuaC0k+J61ED5Dz5J9BL32z1K9oUv+z7Q1nOcvld2mO+4SGdvQDHftOdtbubmrVLXrVTVPP2oYMPQBsbo9AAJPFya3+Iska4xETSqREQEREBERAREQEREBERAREQEREBERAT629u9V1SmpZ2IVVUZZieQAE8oUWqMqIpZmIVVAyzMTgADqcyztQ0pNnbDfYg39yDTDA59ihH7TcPQhTgsPvMMcBOe9+3qT5qZFa3tuaTshKkqd1ipyu8PeAI4HB4ZHDhwnlnavXdadJGd2O6qqMsT6CfTTbCpdVFo0ELuxwoH6knkABxJPAAS19D1DStnkOawubsjFRqQ38d0RvdVQefHJxx6ARvk9s6nmpk7Sbw02Rq6VSY3FXL1d1jSXBp0yB36tjgSOHAc8Zk5lF6x4w3VTItKKUV+J/PU9Dxwo+WDLJ8P9qRqtsHYqKyHcqqPi+6wHYjj88jpMXJjc/lpeWfESuRvaHbSy05xTuaxDld7cVGZt0kgE4GByPMzeXt0tCm9WocKiM7HsqgsT+QnKut6o97cVLip71Ry2PhHJVHoFwPpHDxe++fgt6XVceMVghwtO4f1CIB/U4P6TT6p4q2Nyu5X05qq9qnszj5c8H1Ep6JrnpsRT3VKa39l3VUCl7eyVuGWxWoqemRkOo9cn6Ta3/hXequ/bNRuEIyppuFLKeoDYU8OzGQGTLYbbytpbBHzUtyfNTz5lzzakTyP4eR9Dxk6zrM/hf6pLPtGtS0uvatu3FF6bfjUqD+6Twb6TL2X0RtQrrbo26zK5UnlvIhcBuwOMZ9Z0paXNvqVAOm5WouPvAMp7hlPJhyIPETV6RsPZ2Vybq2QoxRl3AxNPzEEsA2Sp4EYBxg8px/yfFlnVW9rnC/s3t6j0qyFXRiGU8wR/j3z1GDMaXj4w7JivSN7RX9pSX9oB9+kPvH1Xnn4c9hKOmji3789qWdERE6IIiICIiAiIgIiICIiAiJJvD/AGd/tK8Smw/Zp+0qn8CkeX+IkL8iT0ldamZ3UxYnhBseKaC+uE87j9gD92mRjf8A3mGcfh/eku2tsdOUfa9SRWFNd1d8lhzJCpTzhmJPbJwOg4brUrxLShUqsMJSps2B8KLnAH0xOadqdpq+qVTVrthRkJTB8lNT0Xue7cz8sCYs51y6t7dLZIy9ptrDdEpa0UtrfiBTpqqs6/8Amso837vIeuMyMRE25zMzqOdpN9sftI+l3K1kyU92ogPvoTxH7w5g9x2JmhiTrM1OqRfXidtEjaUHt3BW5KIrDqpy7A9jhSpHTJlCy2dL2PN5oKlATWD1LimMk547pQDpvKg4d8GVNOHBMyXM/U6IiJoVIiIEu8O9pq9hcolFTUSs6q9EfeJIAZezDvyI4HuOk5V3hRsR9mUXl0uKzr+zUjjTQjmQeTkfkPmQLRnm8+s634dc/D8VUDAhgCCCCDyIPAgznjxB2FfS2NSll7Z28rY40yTwV/8AAN19Dz6LmPd2qVkanVUMjKVZWGQyngQZHHyXF7hZ25FiSjbzZZtKuNwZNJ8tRY8yoxlW/EuQD3BB6yLz0c6mp3HOzoiIlkEREBERAREQEREBLz8MbajpenG8umCe2IYs3MIDu0hw55yTj8UpG1oNVdKae87qi/vMQo/UyY+JG0IuHSztz/s1qBTUDkzoNwt6gAbo+p6zjyy76zP7WnjytTxavNzTK26f7w00BB6F1Y/MFVI+s51k81faU3mjUqLkmpQuadNj8SeyrGmc98Lun93PWQORwZuc2X9NXsiIndUgxPQCeA5ngPrA6o2TtvY2Vsnw0KY+u4Cf1MpTxY2X+w3Pt6S4o3BJGOSVObr6A+8P4h0l/W6BVVRyCgD6ACa/aHRaeoUHoVh5WHAjmrD3WX1B/wBJ5vHyezfbrZ3HKc/SqWIABJPIAZJ+QEu/R/By2p8bqu9Y/Co9mh+eCW/JhJ1pGz1rZAC1tkp8MbwXLn5ucsfqZp16qT48qzLnrStgtRusFLRlU/fqYpqB3w2GI+QMkFtolroFZKmrOK9XG9Tt6A31U54PUZ90c+Q7gnjiWxtntPT0q3NV8Fz5adPPF2x+ijmT29SJzZqeoVLqq9asxZ3beZj36ADoAOAHQASMXfL8+IXqLTv/ABpPEW9kAPiqPx/kUf8A2kduvFnUqnuPSp/uUwf+MtIHE6zgxPpHuq8PC/b6peu1tfVA1U5ak+FXfA4shCgDeA4juM9uM52ovaltaV69AKXp0zUAYEqQvmbIBH3QZy5a3LUXWpTYq6MGVhzVlOQZ0ns7rKazYFwBl0alVT4XK4cfI5BHowmbm4pnUs+Fpe1Zazt3b6zbNQvKPsKo81Gqp36YqAcA3DeRW4qfeHHPSVnPBPZrxiYnhS3siIl0EREBERAREQERED621w1J1dDhlOVPYjkZ8gOgiSvw00cXuoUlYZWnms4/DTxu/wBZQfWV3qZl1Uzyl21Gy4sNCpoy/tBWp1qh677hkx9A4X6esqadP7daO9/Y1reljfYKVycDeSoj8+nukfWVXZeDd4397XoIPQu7fUboH6zNw82Zm+6/a1z+K0iW4/g/SoI1S61HdpqN5iKQUKBzyzOf8Ji7HHZ9KhDs7MGwr3SgUmHQqF8o/jGZ1/589d57qPagmibNXd+cWtu7jq+N2mO+XbC/TOZZmzfg+EZal9cZKsG9nSHlyDnDOw4jhxAA+cte2ZGRTTKlceUrgrjpu44Yn3mXfqN68TwtJACexE4LPJh6lfU7Wk9aswVEUsxPQDt3PQDqSJmStPGqzualqj0STRRi1ZF59BTY91B3s9sg9Mic5l1JUVU+2G0lTVLlqz5CDy00zwROg/ePMnuewE0MGJ6uczM6jn2RESUEnPhTtL9huxTc4pXBVG7K+cU29OJ3T6NnpINJFsHov2+9o0iMoG334ZG4hDMD8+C/xTnyyXF7TPlqNWpezr1kH3arr/K7D/KYk3G19D2d9dL2uKn6uT/nNPLZveYUiIlkEREBERAREQEREDdbI6XTvbulQr1CiO26WXGScEhQTyJIxnjznSOibP21gu7a0Ep8ACwGXbHxOeLfUzlek5RgysVZSCCDggg5BB6HIE6b2F11tRs6dd1w5yr45F0OGZewPPHTOJj9VNeL9L5SOYOq6lSs6T1q7hUQZYn9AB1JPAAcyZnGUH4y6vcPeG3fy0aaq1NQeDllBLt3Od5R23Tjmc5+PHv10tb0023G2lXVXxxSgp8lLPPsz495v0XkOpMTiJ6WczM6jnb22Gla1cWbb1tcPSOckKxCk4x5k91vqDLB0Xxir08LeUUqr1dPI+Op3eKsfTyyrp4ZXfHnXzCWuwEOQCOvH85+5rNnbgVbWg4Od6jTbPzRZ+9X1KnZ0Xr1mwlNSx7nsB3JOAPnPN689OrPn4qIGBDAEEYIPEEHmCJRFv4wXquzNTouhYkIVKlVzwUODx4dSDJZpfjHa1MC4o1aR6lcVEH1GG/pnS8O59I7iHeJmwh09zcWy5tmPEDnRYnkfwE8j0zjtmvZ0/Z7UadqClEuaLhwVKOd0sDwIKOAT8sSmvEPYRtNf21uC9qx4H3jSJ+6x6r2b6HjjOjh5b/518q6n3EFieZns1KEu/wR0L2VB7tx5qzbiZ/8NDxI+bZ/lEp7RdMa8uKdvT96owUHsObMfQKCfpOqdOs0tqSUaYwtNAij0UYEy+p31Pb+r5n25x8TKe5qd0B1dW/mpox/UmRx7dwiuVIVywVjyYrjex8t4cf9DL01vw2Goag9zcVN2iwTyL77lVAYM3JV4Y4ZJ9JXHildUzefZ6AVaVtTWiqr7oIyzY9csAfVZbi5Jesz88os+0MiImhUiIgIiICIiAiIgJ0D4L1A2nAZ92s4P13W/wA5z9Lb8FtaShRvEqsAtMC46e6FK1D9N1PznD1E7wtn5Wous0GuGtRWX26qGNPPmw2cY7nAyQOIBBPMStPHLRt5aN4o939i5/C2Wpk+md4fxCVXqGr1bi4e6LlajuagZWIZDnyhWHEYGAPlLB0zxATULZ7HVyF9om4twF4BuBRqqjkQwB3hw4cQOc4zh1izU/tbuXwq6JkX1o1B2p1BhlOD27gg9QRgg9QQZjzbL25kREDpPwvu/baZbkniqtTP/tuyj+kLK+8Z9pva1VsqTeWmQ1XHJqhHlU9wAc/NvSfXw92nGn6TdVG4tTrEUgeTPURd1R6bylj6ZlWV6zVHZ3YszsWZjzLMckn6zJx8X/Zbfpe3w+cRE1qBm70Dae5sHVqVZiqnjTZmNJx1DLnHLrzHSaSJGszXip7dLaBX0/V6IrU7aixPB1amhdG6q/D8jyMzTsdp5/7hb/7pP9Jzns5tBX06sK1u2DyZT7rr8LDqPXmJ0JsdtfQ1anvUzu1FA9pSJ8yHuPiXPJh9cHhMHLx6x5l8Ly9tpY6Ha2xzQtaVNuW8lNVbjzwQMzZT2Jwt7WaXajWk0+2qXD48q+UfE54Io+Z/TM5buKzVHZ3beZ2LMx5lmJLE/UmWB4x6+9xdm15U7fHD4ndFYsfkGCjt5u8rub/T49ue/wBc9UiImhUiIgIiICIiAiIgJk2d69HfFNt32iNTf1RipYf0iY0RZ2EREC2dldJo7QaeKNUhLm1xTSqBlvZnJphh95feXHTdyOcrvX9n7jT6vsrlN1vusOKOPiRuo/UdQJsvD/aH+zbxKjEik/7Or23GPvY/CcN8ge86H1nRre/peyuaa1EPEdwccCrDipweY7zJrd4t9fVXk7jlGTDYjYWvqrBzmnbhsNUxxbHNaQPM9M8h64xLA0nwft6VcvXrNWpA5SkV3Sf/AFWB83yAGf0ll0KKU1CU1CKoACqAFAHIADgBHJ6mddZJn9U54w0KVlb2dlbIEQF33R+EBQSeZJ32yTzlTywPGi79pqO4D/d0UTGeRYu5+uHX8hK/nbgnWIjXyRETqqREQEvvwj2V+x0PtNZcVq4BAI4pSOCB6FuDH+HtK38Pdn6Ver9ovnRLaick1GCrUccQoz7wHNvoOssPaDxbtKAK2aNcPyDYKUh095hvH6DB7zLz61r+Gf7Xk681Yl1cpRVnquqIoyWYgKB6k8BP2Kqld4EFcZzkYxjOc8sTl3aPam61Jt65qkqDlaa+WkvyXqfU5PrNlom3Ne0s69mCWV0K02LHNHe8r7p+HdLYA5Nx6mcv8bXXafdGk2i1D7VdV645VKrMv7pY7v8ATia2Im6TqdOZERJCIiAiIgIiICIiAiIgJLNkNHsL4ilc3VS3rZwudw0qmTwCsQN1um6Tx6HjgROJXUtnUvSYvvTvCGxpnNV61b0Zwqn+QBv6pP7W3Wki00GFVQqjJOFUYAyeJ4Cc27PbeX1gAtKtv0xyp1QXUfI5DKPQECWBpXjPTbAurV0PVqbBl/lOCPzMxcnFyX58ryxbMGajZ7XqGo0vbWr7y5KkEYZWHRl6Hr65m3mezrxVnOHilZV01CvUq0mVKjKUcjyMqoqjdblnC8uYkNnUep6xp7BqF1dWvwvTqVaXA9mRjwMq/aXYzSny9hqltSbn7N7im1MnsrBiy/1Tbxc86mdRSxVkTf8A/RC9Zd+jbmumSoegy1UJXngoSfzExm2avhzsLof/AB6n/wCZo9+f1XqtTNvsxoFXUrhaFEYzxdiMqij3mb/IdTgTI0/Y6/uHWmtnWUscb1Sm6IvcszDAH69sy/8AY3ZWlpdH2dLzO2DUqEYZ2H+CjiAOnzJM5cvNMzx8pkVR4vaXSsjZW9Bd1EouB3J3hliepJySfWVxL62+2Er6tdU3WslOklIJkhmfeLMWIUYGMFevQyH6xpulaJleN9djhuOR7BG71EX/AICWPLlzlOLlntk+anU8q7Nu4UOVIRiQrEYDEc93vjrjlPjNhqF5XvXarU3nIHHdXyIg5BVUYRR25TXzTPjyoRESQiIgIiICIiAiIgIiICIiAiIgIiIG62Y2jr6ZWFa3PPg6H3HXs3Y9jzH5idBbKbY22qJ+xbdqAeei5AqL3wPvL6j64PCcxz906jIwZGKspyGBIYEciCOIM48vDnfn7Wl6SzxUszR1OvkcH3Ki+oZFB/qDflIhNhqer17sqbmq1RkXcV3wX3c5AZubDJJ4k8z3mvl8ZszJUVudm9pLjTantLZ8Z95Gyabjsy/4EcR3nQuxm039qUPa/Z6lIjgd4eRj3pvw3l+gnP2k69TtcFLCg7j79bfqAHuE3go/Kby68VdScYR6dMYx5KY4fLfLYnHm4rv4n9rS9Ohycc5E9e8QbCxyHrio4+5Sw7Z7Eg7q/Uzn/U9oLq7z9puqtQH7rOdz6IPKPymrlM+l/wBqXX4nu1Hihd3oKUP9mpHgQjZqsPV+GB6KB8zIFETVjGcTqRW3tvND177IjL7PeyxYHe3cEhRx4H4Rx9WHXI0jHP8Ay5fSeRJkk8nZERJQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA/9k="
                    alt="post-img"
                  />
                </div>
                <div className="post-details">
                  <h4>UEFA Leagues Highlights</h4>
                  <p>
                    2 d · <i class="fa-solid fa-earth-asia"></i>
                  </p>
                </div>
              </div>
              <div className="options">
                <i class="fa-solid fa-ellipsis fa-lg"></i>
                <i class="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
            <div className="postsec-2">
              <div className="caption">
                <p>Kyle Walker and Vincent Kompany meet again 😂🤗</p>
              </div>
            </div>
            <div className="postsec-3">
              <div className="img">
                <img
                  src="https://scontent.fbom3-2.fna.fbcdn.net/v/t39.30808-6/366799494_226663027026010_3635692953094358680_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=ZPnPxnU_PyoAX_ZZwgt&_nc_ht=scontent.fbom3-2.fna&oh=00_AfDYEXe0NzGCPGsUvCt16sEoLlI6entXelyaVHflyKbWBg&oe=64DDED00"
                  alt="postimage"
                />
              </div>
            </div>
            <div className="postsec-4">
              <div className="post-activity">
                <div className="activity-left">
                  <img src={like} alt="like" />
                  <p>191K</p>
                  {/* <img src={heart} alt="heart" /> */}
                </div>
                <div className="activity-right">
                  <p>531 comments</p>
                  <p>112 shares</p>
                </div>
              </div>
            </div>
            <div className="postsec-5">
              <div>
                <i class="fa-regular fa-thumbs-up"></i>
                <p>Like</p>
              </div>
              <div>
                <i class="fa-regular fa-message"></i>
                <p>Comment</p>
              </div>
              <div>
                <i class="fa-solid fa-share"></i>
                <p>Share</p>
              </div>
            </div>
          </div>
          <div className="post">
            <div className="postsec-1">
              <div className="post-user">
                <div className="post-img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t39.30808-1/272520157_651710152917456_4258238726203043423_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c7e18e&_nc_ohc=TMQI19SDpvcAX_j2_oR&_nc_ht=scontent.fbom3-2.fna&oh=00_AfCGcLvAbtIzyE530h2Glz3JbbDce_alj_bb1TOhgVmCNw&oe=64DF89E1"
                    alt="post-img"
                  />
                </div>
                <div className="post-details">
                  <h4>Vantas Mumbai</h4>
                  <p>
                    2 d · <i class="fa-solid fa-earth-asia"></i>
                  </p>
                </div>
              </div>
              <div className="options">
                <i class="fa-solid fa-ellipsis fa-lg"></i>
                <i class="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
            <div className="postsec-2">
              <div className="caption">
                <p>1954..Marine Drive.. what a lovely sight..</p>
                <p style={{ color: "blue" }}>
                  #oldmumbai #oldmumbaibuildings #marinedrive
                </p>
              </div>
            </div>
            <div className="postsec-3">
              <div className="img">
                <img
                  src="https://scontent.fbom3-2.fna.fbcdn.net/v/t39.30808-6/365735291_682315647249096_1073793275152886260_n.jpg?stp=dst-jpg_s640x640&_nc_cat=1&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=9QVv49gLypkAX8hIFMR&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAEn4huY8LPRq7qPbZO4QazIuuEwTLL9iXlCl-MDNb6kg&oe=64DF7573"
                  alt="postimage"
                />
              </div>
            </div>
            <div className="postsec-4">
              <div className="post-activity">
                <div className="activity-left">
                  <img src={like} alt="like" />
                  <p>191K</p>
                  {/* <img src={heart} alt="heart" /> */}
                </div>
                <div className="activity-right">
                  <p>531 comments</p>
                  <p>112 shares</p>
                </div>
              </div>
            </div>
            <div className="postsec-5">
              <div>
                <i class="fa-regular fa-thumbs-up"></i>
                <p>Like</p>
              </div>
              <div>
                <i class="fa-regular fa-message"></i>
                <p>Comment</p>
              </div>
              <div>
                <i class="fa-solid fa-share"></i>
                <p>Share</p>
              </div>
            </div>
          </div>
          <div className="post">
            <div className="postsec-1">
              <div className="post-user">
                <div className="post-img">
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t39.30808-1/305028616_498133172323583_240796034226990361_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=c7e18e&_nc_ohc=zqJ7cS3MBZoAX-UFA43&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAm8O2YqxygNQFupQTWwtyjzaMFsuTPs9Yqroagf7bo2Q&oe=64DFE2FF"
                    alt="post-img"
                  />
                </div>
                <div className="post-details">
                  <h4>Home Design</h4>
                  <p>
                    2 d · <i class="fa-solid fa-earth-asia"></i>
                  </p>
                </div>
              </div>
              <div className="options">
                <i class="fa-solid fa-ellipsis fa-lg"></i>
                <i class="fa-solid fa-xmark fa-xl"></i>
              </div>
            </div>
            <div className="postsec-2">
              <div className="caption">
                <p>Amazing</p>
              </div>
            </div>
            <div className="postsec-3">
              <div className="img">
                <img
                  src="https://scontent.fbom3-2.fna.fbcdn.net/v/t39.30808-6/365669351_752765220193709_678149761891489623_n.jpg?stp=dst-jpg_s720x720&_nc_cat=1&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=WA6BGA8Rw4IAX-MUcD8&_nc_ht=scontent.fbom3-2.fna&oh=00_AfA4KqSN7RJZmbRNq8ycudOK1LU5Gbnn7VXx_6wGT80Muw&oe=64DEEC2C"
                  alt="postimage"
                />
              </div>
            </div>
            <div className="postsec-4">
              <div className="post-activity">
                <div className="activity-left">
                  <img src={like} alt="like" />
                  <p>191K</p>
                  {/* <img src={heart} alt="heart" /> */}
                </div>
                <div className="activity-right">
                  <p>531 comments</p>
                  <p>112 shares</p>
                </div>
              </div>
            </div>
            <div className="postsec-5">
              <div>
                <i class="fa-regular fa-thumbs-up"></i>
                <p>Like</p>
              </div>
              <div>
                <i class="fa-regular fa-message"></i>
                <p>Comment</p>
              </div>
              <div>
                <i class="fa-solid fa-share"></i>
                <p>Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="header">
          <h4>Group conversations</h4>
        </div>
        <div id="new-group">
          <i class="fa-solid fa-plus"></i>
          <p>Create New Group</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
