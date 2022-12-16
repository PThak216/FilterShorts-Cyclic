import React, { useEffect, useState } from "react";
import ShortsMain from "../Shorts/ShortsMain";

const Sports = () => {
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

  let alldata = apidata;
  if (alldata) {
    alldata = alldata.filter((items) => items.catogory === "Sports");
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
              <h1>No Videos to Show</h1>
            </div>
          </div>
        </>
      ) : (
        <ShortsMain apidata={newapidata} />
      )}
    </>
  );
};

export default Sports;
