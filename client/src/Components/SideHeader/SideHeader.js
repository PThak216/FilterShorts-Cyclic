import React from 'react'
import {  useLocation, useNavigate } from 'react-router-dom';
import { Postdetails } from '../../Context/FetchData';
import ConnectCompo from '../Connect/ConnectCompo';
import "./SideHeader.css"
import { useInView } from 'react-intersection-observer';
const SideHeader = () => {
  const { ref, inView } = useInView({
    threshold: 0
  });
  const navigate = useNavigate();
  const {  topicdispatch } = Postdetails();
  const location = useLocation();
      if (location.pathname === "/upload")
        return null;
        if (location.pathname === "/fullscreenpost")
        return null;
        if (location.pathname === "/login")
        return null;
  return (
    <div className='sideheader'>
        <ul className="main_sheader">   
        <div className="main_sheaderli">
  <li className='for_you' onClick={()=>navigate("/") } style={location.pathname === "/" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}><i className="fas fa-home" ></i>For You</li>
  <li className='for_you' onClick={()=>navigate("./following")}  style={location.pathname === "/following" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}><i className="fas fa-user-friends"></i>Following</li>
  <li className='for_you' onClick={()=>navigate("./saved")} style={location.pathname === "/saved" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}><i className="fas fa-bookmark" style={{fontSize:"21px", marginRight:"1.5rem", color: "rgb(221, 6, 78)", marginLeft:"0.3rem"}}></i>Saved</li>
  </div>    
  <p className='marginp'>Popular Topics</p>
  <div className="topicsli">
  <li className='topics' onClick={()=>navigate("./comedy")} style={location.pathname === "/comedy" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}} >
    <i className="fas fa-laugh"></i>Comedy</li>

  <li className='topics' onClick={()=>navigate("./food")} style={location.pathname === "/food" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}>
    <i className="fas fa-utensils"></i>Food</li>

  <li className='topics' onClick={()=>navigate("./sports")} style={location.pathname === "/sports" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}> 
  <i className="fas fa-baseball-ball"></i>Sports</li>

  <li className='topics'onClick={()=>navigate("./animals")} style={location.pathname === "/animals" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}>
    <i className="fas fa-paw"></i>Animals</li>

  <li className='topics' onClick={()=>navigate("./beauty")} style={location.pathname === "/beauty" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}>
    <i className="fas fa-heart"></i>Beauty</li>

  <li className='topics' onClick={()=>navigate("./dance")} style={location.pathname === "/dance" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}>
    <i className="fas fa-biohazard"></i>Dance</li>

  <li className='topics' onClick={()=>navigate("./gaming")} style={location.pathname === "/gaming" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"black"}}>
    <i className="fas fa-gamepad"></i>Gaming</li>

  </div>
  <p className='marginp'>Accounts to Follow</p>
  <div className="accounts_main">
  <div className="accounts" >
    {/* <div className="avatar" style={{marginLeft:"0rem"}}></div>
    <h4>Parth Thakkar</h4> */}
   <ConnectCompo/>
  </div>
  
  <div className="see_all" onClick={()=>navigate("/connect")}  inView={inView} ref={ref}>
    See all 
     {/* {inView.toString()} */}
  </div>
  </div>
        </ul>
    </div>
  )
}

export default SideHeader