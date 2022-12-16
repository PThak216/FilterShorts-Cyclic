import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShortsMain from "./ShortsMain";

const Following = () => {
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState([]);
  const [apidata, setApidata] = useState([]);

  useEffect(() => {
    const FetchPosts = async () => {
      const res = await fetch("/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      var data = await res.json();
      setApidata(data);
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
      }
    };
    Callmainpage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let alldata = apidata;
  if (userdata.following === undefined) {
  } else {
    alldata = alldata.filter((items) =>
      userdata.following.includes(items.username)
    );
  }
  let newapidata = alldata;

  return (
    <>
      {newapidata.length === 0 ? (
        <>
          <div className="not_data">
            <div className="notdata_main">
              <div className="circle_icon">
                <i className="fas fa-users"></i>
              </div>
              <h1>Not Following Anyone</h1>
              <p>Find accounts to follow?</p>
              <p
                style={{ color: "blue", cursor: "pointer", marginTop: "0rem" }}
                onClick={() => navigate("/connect")}
              >
                Click Here
              </p>
            </div>
          </div>
        </>
      ) : (
        <ShortsMain apidata={newapidata} />
      )}
    </>
  );
};

export default Following;
