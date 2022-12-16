import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Postdetails } from "../../Context/FetchData";
import "./TopHeader.css";

const TopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userdata, setuserdata] = useState([]);
  const { newData, topicdispatch } = Postdetails();
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

        navigate("/login");
      }
    };
    Callmainpage();
  }, [newData]);

  if (location.pathname === "/login") return null;
  if (location.pathname === "/fullscreenpost") return null;

  return (
    <div className="topheader">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>FilterShorts</h1>
      </div>
      <div className="search_section">
        <li className="search_bar1">
          <input
            type="text"
            className="search_bar1"
            placeholder="Search Here for topics, users or more "
            onChange={(e) =>
              topicdispatch({ type: "search", payload: e.target.value })
            }
          />
        </li>
      </div>
      <div className="header_icons">
        <i
          className="fas fa-cloud-upload-alt"
          onClick={() => navigate("/upload")}
        ></i>
        <img
          src={userdata.profilepicimage}
          className="avatar"
          alt=""
          style={{ objectFit: "cover" }}
          onClick={() => navigate("/profile")}
        />
        <h3 onClick={() => navigate("/logout")}>Logout</h3>
      </div>
    </div>
  );
};

export default TopHeader;
