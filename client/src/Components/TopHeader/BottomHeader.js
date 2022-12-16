import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Postdetails } from '../../Context/FetchData';
import "./BottomHeader.css"

const BottomHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userdata, setuserdata] = useState([])
    const { newData} = Postdetails();
    useEffect(() => {
        const Callmainpage = async () => {
              const res = await fetch("/home", {
                  method: "GET",
                  headers: {
      
                      "Content-Type": "application/json",
                      Accept: "application/json"
                  },
                  credentials: "include"
              });
              const user = await res.json();
              setuserdata(user)
      }
        Callmainpage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[newData]);
  return (
    <div className='bottom' id='bottom'>
        <div className="home_ico" onClick={()=>navigate("/") } >
        <i className="fas fa-home" style={location.pathname === "/" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}></i>
        <p style={location.pathname === "/" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}>Home</p>
        </div>
        <div className="home_ico" onClick={()=>navigate("/saved") }>
        <i className="fas fa-bookmark" style={location.pathname === "/saved" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}></i>
        <p style={location.pathname === "/saved" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}>Saved</p>
        </div>
        <div className="upload_ico" onClick={()=>navigate("/upload") } style={location.pathname === "/upload" ? {backgroundColor:"rgb(221, 6, 78)"} : {color:"white"}}>
        <i className="fas fa-plus"  ></i>
        </div>
        <div className="home_ico"  onClick={()=>navigate("/connect") }>
        <i className="fas fa-users" style={location.pathname === "/connect" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}></i>
        <p style={location.pathname === "/connect" ? {color:"rgb(221, 6, 78)"} : {color:"white"}}>Connect</p>
        </div>
        <div>
        <img src={userdata.profilepicimage} className="avatar" alt=''  style={{objectFit:"cover"}} onClick={()=>navigate("/profile")}/>
        </div>
       


    </div>
  )
}

export default BottomHeader