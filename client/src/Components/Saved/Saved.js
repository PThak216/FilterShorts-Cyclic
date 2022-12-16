import "../Shorts/Shorts.css";
import React, { useEffect, useState } from "react";
import ShortsMain from "../Shorts/ShortsMain";

const Saved = () => {
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
  if (apidata && userdata.bookmark === undefined) {
  } else {
    alldata = alldata.filter((items) => userdata.bookmark.includes(items.id));
  }
  let newapidata = alldata;

  return (
    <>
      {newapidata.length === 0 ? (
        <>
          <div className="not_data">
            <div className="notdata_main">
              <div className="circle_icon">
                <i className="fas fa-video"></i>
              </div>
              <h1>No Saved Posts Yet</h1>
            </div>
          </div>
        </>
      ) : (
        <ShortsMain apidata={newapidata} />
      )}
    </>
  );
};

export default Saved;
