import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Postdetails } from "../../Context/FetchData";
import "./FullScreenPost.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const FullScreenPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userdata, setuserdata] = useState([]);
  const { data } = location.state;
  const { dispatch } = Postdetails();
  const [apidata, setapidata] = useState([]);

  let alldata = apidata;

  alldata = alldata.filter((items) => data.id === items.id);

  let newtweetdata = alldata;

  const Delete = async (item_id) => {
    const res = await fetch("/deletedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        item_id,
      }),
    });
    const data = await res.json();
    // setnewData(data)
    if (res.status === 422 || !data) {
      console.log("invalid");
    } else {
      navigate("/profile");
      toast.error("Deleted");
    }
  };

  useEffect(() => {
    const FetchPosts = async () => {
      const res = await fetch("/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      var data = await res.json();
      setapidata(data);
    };
    FetchPosts();
  }, []);

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

  const like = (id) => {
    setapidata(
      apidata.map((item) => {
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
      apidata.map((item) => {
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
  return (
    <>
      {userdata.bookmark === undefined ? (
        <div className="sipnnerstyle">
          <Spinner />
        </div>
      ) : (
        <div className="fullscreen_main">
          <div className="left_area" id="left_area">
            <i
              className="fas fa-times"
              onClick={() => {
                newtweetdata[0].email === userdata.email
                  ? navigate("/profile")
                  : navigate("/profile/" + newtweetdata[0].username);
              }}
              style={{ color: "white", marginTop: "1rem", marginLeft: "1rem" }}
            ></i>
            <div className="video_player">
              <video src={data.video} autoPlay="autoplay" muted controls />
            </div>
          </div>
          <div className="right_area">
            <div className="user_box">
              <div className="area_header">
                <Link to="/profile" className="for_link">
                  <img
                    src={data.profilepicimage}
                    className="shorts_avatar"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />{" "}
                </Link>
                <div className="username" style={{ width: "21rem" }}>
                  <div className="post_details">
                    <Link to="/profile" className="for_link">
                      <h4>{data.name}</h4>
                    </Link>
                    <Link to="/proflie" className="for_link">
                      <p>{data.username}</p>{" "}
                    </Link>
                  </div>
                  <div className="user_caption" style={{ width: "20rem" }}>
                    <p>
                      {data.caption}{" "}
                      <p style={{ fontWeight: "600" }}>
                        &nbsp;#{data.catogory}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="allicons" id="allicons">
                <div className="alllikes" id="alllikes">
                  {newtweetdata[0].Likes.includes(userdata.email) ? (
                    <>
                      <div
                        className="like_circle"
                        onClick={() => unlike(newtweetdata[0].id)}
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
                        onClick={() => like(newtweetdata[0].id)}
                      >
                        <i
                          className="fas fa-heart"
                          style={{ marginRight: "0rem", color: "black" }}
                        ></i>
                      </div>
                    </>
                  )}
                  {newtweetdata[0].Likes.length > 0 ? (
                    <p className="Like_number">
                      {newtweetdata[0].Likes.length}
                    </p>
                  ) : (
                    <p className="Like_number" style={{ color: "black" }}></p>
                  )}
                </div>
                {userdata.bookmark.includes(newtweetdata[0].id) ? (
                  <div
                    className="like_circle"
                    style={{ marginRight: "1.5rem" }}
                    onClick={() => UnBookmark(newtweetdata[0].id)}
                  >
                    <i
                      className="fas fa-bookmark"
                      style={{ marginRight: "0rem", color: "rgb(221, 6, 78)" }}
                    ></i>
                  </div>
                ) : (
                  <div
                    className="like_circle"
                    style={{ marginRight: "1.5rem" }}
                    onClick={() => Bookmark(newtweetdata[0].id)}
                  >
                    <i
                      className="fas fa-bookmark"
                      style={{ marginRight: "0rem", color: "black" }}
                    ></i>
                  </div>
                )}
                {newtweetdata[0].email === userdata.email ? (
                  <div
                    className="like_circle"
                    onClick={() => Delete(newtweetdata[0].id)}
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullScreenPost;
