import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Postdetails } from "../../Context/FetchData";
import "./TopHeader.css";

const TopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topicdispatch } = Postdetails();

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
        <i class="fas fa-user" onClick={() => navigate("/profile")}></i>

        <h3 onClick={() => navigate("/logout")}>Logout</h3>
      </div>
    </div>
  );
};

export default TopHeader;
