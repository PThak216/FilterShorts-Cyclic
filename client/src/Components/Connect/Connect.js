import React from "react";
import { useNavigate } from "react-router-dom";
import "./Connect.css";
import ConnectCompo from "./ConnectCompo";
const Connect = () => {
  const navigate = useNavigate();
  return (
    <div className="connect_all">
      <div className="connect_area">
        <div className="connect_header">
          <i
            className="fas fa-times"
            onClick={() => {
              navigate("/");
            }}
          ></i>
          <h2>Accounts to Follow</h2>
        </div>
        <ConnectCompo />
      </div>
    </div>
  );
};

export default Connect;
