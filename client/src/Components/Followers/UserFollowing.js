import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./FollowersMain.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Postdetails } from "../../Context/FetchData";
import Spinner from "../Spinner";

const UserFollowing = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const [alluserdata, setalluserdata] = useState([]);
  const { dispatch } = Postdetails();
  const location = useLocation();
  const { data } = location.state;
  const [profile_username, setusername] = useState(data);
  const [userProfileDetails, setUserProfileDetails] = useState([]);

  let alldata = alluserdata;
  if (alluserdata && userProfileDetails.following !== undefined) {
    alldata = alldata.filter((items) =>
      userProfileDetails.following.includes(items.username)
    );
  }
  let newtweetdata = alldata;

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

  useEffect(() => {
    const Fetchposts = async () => {
      const res = await fetch("/connect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setalluserdata(data);
    };
    Fetchposts();
  }, []);

  useEffect(() => {
    const FetchProfile = async () => {
      const res = await fetch(`/userProfile/${profile_username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserProfileDetails(data.user);
    };
    FetchProfile();
  }, []);

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

  return (
    <>
      {userProfileDetails.following === undefined ||
      userProfileDetails.followers === undefined ||
      userdata.followers === undefined ||
      userdata.following === undefined ? (
        <Spinner />
      ) : (
        <div className="followers_main">
          <div className="followers">
            <div className="Followers_header">
              <h1 style={{ cursor: "pointer" }}>
                <i
                  onClick={() => navigate("/profile/" + profile_username)}
                  className="fas fa-arrow-left"
                ></i>
                {userProfileDetails.name}
              </h1>
            </div>
            <div className="follwers_header">
              <h3
                onClick={() =>
                  navigate("/userfollowers", {
                    state: { data: profile_username },
                  })
                }
              >
                Followers
              </h3>
              <h3
                style={{
                  color: "black",
                  fontWeight: "600",
                  borderBottom: "2px solid rgb(221, 6, 78)",
                }}
              >
                Following
              </h3>
            </div>
            {newtweetdata.length === 0 ? (
              <div className="notdata_main" style={{ height: "20rem" }}>
                <div className="circle_icon">
                  <i className="fas fa-users"></i>
                </div>
                <h1>Not Following Anyone</h1>
              </div>
            ) : (
              <div className="connect">
                {newtweetdata.map((item) => {
                  return (
                    <div className="connect_main" key={item.username}>
                      <Link
                        to={
                          item.username !== userdata.username
                            ? "/profile/" + item.username
                            : "/profile"
                        }
                      >
                        {/* <div className="avatar" style={{marginLeft:"0rem"}}></div> */}
                        <img
                          src={item.profilepicimage}
                          className="avatar"
                          alt=""
                          style={{ objectFit: "cover", marginLeft: "0rem" }}
                        />
                      </Link>

                      <Link
                        to={
                          item.username !== userdata.username
                            ? "/profile/" + item.username
                            : "/profile"
                        }
                        className="for_link"
                      >
                        <div className="usernamefollow">
                          <h3>{item.name}</h3>
                          <p>{item.username}</p>
                        </div>
                      </Link>

                      <div className="button_connect">
                        {userdata.following.includes(item.username) ? (
                          <button
                            className="profilebtn"
                            style={{ marginTop: "0rem" }}
                            disabled={item.username === userdata.username}
                            onClick={() => unfollow(item.username)}
                          >
                            {item.username === userdata.username ? (
                              <Link to={"/editprofile"} className="for_link">
                                Edit Profile
                              </Link>
                            ) : (
                              "Unfollow"
                            )}
                          </button>
                        ) : (
                          <button
                            className="profilebtn"
                            disabled={item.username === userdata.username}
                            style={{ marginTop: "0rem" }}
                            onClick={() => follow(item.username)}
                          >
                            {item.username === userdata.username ? (
                              <Link
                                to={"/editprofile"}
                                className="for_link"
                                style={{ color: "white" }}
                              >
                                Edit Profile
                              </Link>
                            ) : (
                              "Follow"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserFollowing;
