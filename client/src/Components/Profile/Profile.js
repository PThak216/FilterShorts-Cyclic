import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Profile.css";
import { Postdetails } from "../../Context/FetchData";
import HoverVideoPlayer from "react-hover-video-player";

const Profile = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const { apidata, newData } = Postdetails();

  let alldata = apidata;
  if (apidata) {
    alldata = alldata.filter((items) => items.email === userdata.email);
  }
  let newapidata = alldata;

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

  return (
    <>
      <div className="profile_main">
        <div className="profile">
          <div className="profileinfo">
            <div className="profiledetails">
              <img
                src={userdata.profilepicimage}
                className="profileavatar"
                alt=""
                style={{ objectFit: "cover" }}
              />
              <div className="profilename">
                <h1>{userdata.name}</h1>
                <h4>{userdata.username}</h4>
                <div className="allbtn">
                  <button
                    className="profilebtn"
                    onClick={() => navigate("/editprofile")}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="logoutbtn"
                    onClick={() => navigate("/logout")}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="followinfo">
              {userdata.followers === undefined ? (
                <>
                  0 <p onClick={() => navigate("/followersmain")}>Followers</p>
                </>
              ) : (
                <>
                  {userdata.followers.length}{" "}
                  <p onClick={() => navigate("/followersmain")}>Followers</p>
                </>
              )}

              {userdata.following === undefined ? (
                <>
                  0 <p onClick={() => navigate("/followingmain")}>Following</p>
                </>
              ) : (
                <>
                  {userdata.following.length}{" "}
                  <p onClick={() => navigate("/followingmain")}>Following</p>
                </>
              )}
            </div>
            <p>{userdata.Bio}</p>
          </div>
          <div className="profile_videos">
            {newapidata.length === 0 ? (
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
                {newapidata
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
                            // Make the image expand to cover the video's dimensions
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
    </>
  );
};

export default Profile;
