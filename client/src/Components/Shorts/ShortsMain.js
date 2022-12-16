import "./Shorts.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Postdetails } from "../../Context/FetchData";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const ShortsMain = ({ apidata }) => {
  const videoRef = useRef([]);
  const [userdata, setuserdata] = useState([]);
  const [fetechapidata, setapidata] = useState([]);
  const {
    topicstate: { query },
    dispatch,
  } = Postdetails();
  const navigate = useNavigate();
  const location = useLocation();
  const [playing, setPlaying] = useState(false);

  if (location.pathname === "/saved") {
    let alldata = fetechapidata;
    if (apidata && userdata.bookmark === undefined) {
    } else {
      alldata = alldata.filter((items) => userdata.bookmark.includes(items.id));
    }
    var newapidata = alldata;
  } else {
    var newapidata = fetechapidata;
  }

  if (query !== "") {
    newapidata = newapidata.filter(
      (prod) =>
        prod.caption.toLowerCase().includes(query.toLowerCase()) ||
        prod.catogory.toLowerCase().includes(query.toLowerCase()) ||
        prod.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  useEffect(() => {
    setapidata(apidata);
  }, [apidata]);

  const handlevideoclick = (index) => {
    if (playing) {
      videoRef.current[index].pause();
      setPlaying(false);
    } else {
      videoRef.current[index].play();
      setPlaying(true);
    }
  };

  const like = (id) => {
    setapidata(
      fetechapidata.map((item) => {
        if (item.id === id) {
          return { ...item, Likes: [...item.Likes, userdata.email] };
        }

        return item;
      })
    );
    dispatch({
      type: "Like",
      payload: id,
    });
  };

  const unlike = (id) => {
    dispatch({
      type: "UnLike",
      payload: id,
    });
    setapidata(
      fetechapidata.map((item) => {
        if (item.id === id) {
          const id = item.Likes.indexOf(userdata.email);
          const remove = item.Likes.splice(id, 1);
          return { ...item, Likes: [...item.Likes] };
        }

        return item;
      })
    );
  };

  const UnBookmark = (id) => {
    const nid = userdata.bookmark.indexOf(id);
    const remove = userdata.bookmark.splice(nid, 1);
    let nbkdata = { ...userdata, bookmark: [...userdata.bookmark] };
    setuserdata(nbkdata);
    dispatch({
      type: "UnBookmark",
      payload: id,
    });
  };

  const Bookmark = (id) => {
    let newbkdata = { ...userdata, bookmark: [...userdata.bookmark, id] };
    setuserdata(newbkdata);
    dispatch({
      type: "Bookmark",
      payload: id,
    });
  };

  const follow = (username) => {
    let follow = {
      ...userdata,
      following: [...userdata.following, username],
    };
    setuserdata(follow);
    dispatch({
      type: "FOLLOW",
      payload: username,
    });
  };

  const unfollow = (username) => {
    let unfollow = {
      ...userdata,
      following: [...userdata.following.filter((item) => item !== username)],
    };
    setuserdata(unfollow);
    dispatch({
      type: "UNFOLLOW",
      payload: username,
    });
  };

  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setuserdata(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userdata.following === undefined ? (
        <div className="sipnnerstyle">
          <Spinner />
        </div>
      ) : (
        <div className="Shorts">
          <div className="scrollshorts">
            {newapidata
              .slice(0)
              .reverse()
              .map((item, index) => {
                return (
                  <div className="shots_area" key={item.id}>
                    <div className="area_header">
                      <Link
                        to={
                          item.username !== userdata.username
                            ? "/profile/" + item.username
                            : "/profile"
                        }
                        className="for_link"
                      >
                        <img
                          src={item.profilepicimage}
                          className="shorts_avatar"
                          alt=""
                          style={{ objectFit: "cover" }}
                        />{" "}
                      </Link>
                      <div className="username">
                        <div className="post_details">
                          <Link
                            to={
                              item.username !== userdata.username
                                ? "/profile/" + item.username
                                : "/profile"
                            }
                            className="for_link"
                          >
                            <h4>{item.name}</h4>
                          </Link>
                          <Link
                            to={
                              item.username !== userdata.username
                                ? "/profile/" + item.username
                                : "/profile"
                            }
                            className="for_link"
                          >
                            <p>{item.username}</p>{" "}
                          </Link>
                        </div>
                        <div className="user_caption">
                          <p>{item.caption}</p>
                          <p style={{ fontWeight: "600" }}>#{item.catogory}</p>
                        </div>
                      </div>
                      {item.username === userdata.username ? (
                        <></>
                      ) : userdata.following.includes(item.username) ? (
                        <button
                          className="followbtn"
                          onClick={() => unfollow(item.username)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="followbtn"
                          onClick={() => follow(item.username)}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                    <div className="video_area">
                      <div className="mobile_topheader">
                        <p
                          onClick={() => navigate("/")}
                          style={
                            location.pathname === "/"
                              ? { color: "rgb(221, 6, 78)", fontWeight: "600" }
                              : { color: "white" }
                          }
                        >
                          For You
                        </p>
                        <p
                          onClick={() => navigate("./following")}
                          style={
                            location.pathname === "/following"
                              ? { color: "rgb(221, 6, 78)", fontWeight: "600" }
                              : { color: "white" }
                          }
                        >
                          Following
                        </p>
                      </div>

                      <video
                        src={item.video}
                        loop
                        ref={(element) => {
                          videoRef.current[index] = element;
                        }}
                        onClick={() => handlevideoclick(index)}
                      />

                      <div className="like_sec">
                        <div className="onlylikes">
                          {item.Likes.includes(userdata.email) ? (
                            <>
                              <div
                                className="like_circle"
                                onClick={() => unlike(item.id)}
                              >
                                <i
                                  className="fas fa-heart"
                                  style={{
                                    marginRight: "0rem",
                                    color: "rgb(221, 6, 78)",
                                  }}
                                ></i>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="like_circle"
                                onClick={() => like(item.id)}
                              >
                                <i
                                  className="fas fa-heart"
                                  style={{
                                    marginRight: "0rem",
                                    color: "black",
                                  }}
                                ></i>
                              </div>
                            </>
                          )}

                          {item.Likes.length > 0 ? (
                            <p className="Like_number">{item.Likes.length}</p>
                          ) : (
                            <p
                              className="Like_number"
                              style={{ color: "black" }}
                            ></p>
                          )}
                        </div>
                        <div className="bookmarksec">
                          {userdata.bookmark.includes(item.id) ? (
                            <div
                              className="like_circle"
                              onClick={() => UnBookmark(item.id)}
                            >
                              <i
                                className="fas fa-bookmark"
                                style={{
                                  marginRight: "0rem",
                                  color: "rgb(221, 6, 78)",
                                }}
                              ></i>
                            </div>
                          ) : (
                            <div
                              className="like_circle"
                              onClick={() => Bookmark(item.id)}
                            >
                              <i
                                className="fas fa-bookmark"
                                style={{ marginRight: "0rem", color: "black" }}
                              ></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ShortsMain;
