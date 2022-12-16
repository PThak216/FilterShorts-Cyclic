import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Profile.css";
import { Postdetails } from "../../Context/FetchData";
import Spinner from "../Spinner";
import HoverVideoPlayer from "react-hover-video-player";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const { apidata, dispatch, newData } = Postdetails();
  const { username } = useParams();
  const [userProfileDetails, setUserProfileDetails] = useState([]);
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
  }, [newData]);

  useEffect(() => {
    const FetchProfile = async () => {
      const res = await fetch(`/userProfile/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserProfileDetails(data.user);
    };
    FetchProfile();
  }, [newData]);

  let alldata = apidata;
  if (apidata) {
    alldata = alldata.filter(
      (items) => items.email === userProfileDetails.email
    );
  } else {
    console.log("no data");
  }
  let newvideodetails = alldata;
  return (
    <>
      {userdata.following === undefined ? (
        <Spinner />
      ) : (
        <div className="profile_main">
          <div className="profile">
            <div className="profileinfo">
              <div className="profiledetails">
                <img
                  src={userProfileDetails.profilepicimage}
                  className="profileavatar"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                <div className="profilename">
                  {console.log(userProfileDetails.profilepicimage)}
                  <h1>{userProfileDetails.name}</h1>
                  <h4>{userProfileDetails.username}</h4>
                  {userdata.following.includes(username) ? (
                    <button
                      className="profilebtn"
                      onClick={() =>
                        dispatch({
                          type: "UNFOLLOW",
                          payload: username,
                        })
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="profilebtn"
                      onClick={() =>
                        dispatch({
                          type: "FOLLOW",
                          payload: username,
                        })
                      }
                    >
                      Follow
                    </button>
                  )}
                  {/* <button className='profilebtn'>Follow</button> */}
                </div>
              </div>
              <div className="followinfo">
                {userProfileDetails.followers === undefined ? (
                  <>
                    0{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowers", {
                          state: { data: username },
                        })
                      }
                    >
                      Followers
                    </p>
                  </>
                ) : (
                  <>
                    {userProfileDetails.followers.length}{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowers", {
                          state: { data: username },
                        })
                      }
                    >
                      Followers
                    </p>
                  </>
                )}

                {userProfileDetails.following === undefined ? (
                  <>
                    0{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowing", {
                          state: { data: username },
                        })
                      }
                    >
                      Following
                    </p>
                  </>
                ) : (
                  <>
                    {userProfileDetails.following.length}{" "}
                    <p
                      onClick={() =>
                        navigate("/userfollowing", {
                          state: { data: username },
                        })
                      }
                    >
                      Following
                    </p>
                  </>
                )}
              </div>
              <p>{userProfileDetails.Bio}</p>
            </div>
            <div className="profile_videos">
              {newvideodetails.length === 0 ? (
                <>
                  <div className="notdata_main" style={{ height: "20rem" }}>
                    <div className="circle_icon">
                      <i className="fas fa-video"></i>
                    </div>
                    <h1>No Videos to Show</h1>
                  </div>
                </>
              ) : (
                <>
                  {newvideodetails
                    .slice(0)
                    .reverse()
                    .map((item, index) => {
                      return (
                        <div className="prof_video" key={item.id}>
                          <HoverVideoPlayer
                            videoSrc={item.video}
                            onClick={() =>
                              navigate("/fullscreenpost", {
                                state: { data: item, userdata: userdata },
                              })
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
