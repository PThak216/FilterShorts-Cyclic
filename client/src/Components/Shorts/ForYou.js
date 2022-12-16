import "./Shorts.css";
import React, { useEffect, useState } from "react";
import ShortsMain from "./ShortsMain";

const ForYou = () => {
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

  return (
    <>
      <ShortsMain apidata={apidata} />
    </>
  );
};

export default ForYou;
