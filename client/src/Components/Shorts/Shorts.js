// import "./Shorts.css"
// import React, {  useEffect, useState } from 'react'
// import {  Link, useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
// import { Postdetails } from "../../Context/FetchData";
// import Spinner from "../Spinner";

//   const Shorts = () => {
//   const navigate= useNavigate();
//   const [userdata, setuserdata] = useState([])
//   const { apidata, dispatch , newData } = Postdetails();

//   useEffect(() => {
//     const Callmainpage = async () => {

//       try {
//           const res = await fetch("/home", {
//               method: "GET",
//               headers: {

//                   "Content-Type": "application/json",
//                   Accept: "application/json"
//               },
//               credentials: "include"
//           });
//           const user = await res.json();
//           setuserdata(user)
//           if (!res.status === 200) {
//               const error = new Error(res.error);
//               throw error;

//           }
//       } catch (err) {
//           console.log(err);
//           toast.error("Please Login For Better Experience")
//           navigate("/login");
//       }
//   }
//     Callmainpage()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[newData]);

//   return (

//     <>
//      {
//      userdata.following === undefined  ?
//      <div className="sipnnerstyle">
//      <Spinner/>
//      </div>

//       :
//       <div className='Shorts'>
//       {
//         apidata.slice(0).reverse().map((item)=>{
//           return(
//             <div className="shots_area" key={item.id}>
//             <div className="area_header">
//             <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
//             <img src={item.profilepicimage} className="shorts_avatar" alt=''  style={{objectFit:"cover"}}/> </Link>
//             <div className="username">
//           <div className="post_details">
//           <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
//             <h4>{item.name}</h4>
//             </Link>
//             <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
//             <p>{item.username}</p> </Link>

//           </div>
//           <div className='user_caption'>
//             <p>{item.caption}<p style={{fontWeight:"600"}}>&nbsp;#{item.catogory}</p></p>

//           </div>
//             </div>
//             {
//               item.username === userdata.username ?
//               <></>
//               :
//               userdata.following.includes(item.username) ?
//               <button className='followbtn'onClick={()=>dispatch({
//                 type: 'UNFOLLOW',
//                 payload: item.username,
//               })}>Unfollow</button>
//               :
//               <button className='followbtn' onClick={()=>dispatch({
//                 type: 'FOLLOW',
//                 payload: item.username,
//               })}>Follow</button>
//              }
//             {/* <button className='followbtn'>Follow</button> */}
//             </div>
//             <div className="video_area">
//             <video src={item.video} controls/>
//             <div className="like_sec">

//                 {
//                     item.Likes.includes(userdata.email)
//                     ?
//                     <>
//                     <div className="like_circle" onClick={()=>dispatch({
//                     type: 'UnLike',
//                     payload: item.id,
//                   })}>
//                     <i className="fas fa-heart" style={{marginRight:"0rem", color:"red"}}></i>
//                       </div>
//                       </>
//                     :
//                     <>
//                      <div className="like_circle" onClick={()=>dispatch({
//                     type: 'Like',
//                     payload: item.id,
//                   })}>
//                      <i className="fas fa-heart" style={{marginRight:"0rem", color:"black"}} ></i>
//                      </div>
//                     </>

//                 }

//                 {
//                   item.Likes.length>0?
//                   <p className='Like_number'>{item.Likes.length}</p>
//                   :
//                   <p className='Like_number' style={{color: "black"}}></p>
//                 }

//                 {
//                   userdata.bookmark.includes(item.id) ?
//                   <div className="like_circle" onClick={()=>dispatch({
//                     type: 'UnBookmark',
//                     payload: item.id,
//                   })}>
//                <i className="fas fa-bookmark" style={{marginRight:"0rem", color:"red"}} ></i>
//                 </div>

//                 :
//                 <div className="like_circle" onClick={()=>dispatch({
//                   type: 'Bookmark',
//                   payload: item.id,
//                 })}>
//                        <i className="fas fa-bookmark" style={{marginRight:"0rem", color:"black"}} ></i>
//                   </div>

//                 }

//             </div>
//             </div>
//           </div>
//           )

//         })
//       }

//     </div>
//      }
//     </>

//   )
// }

// export default Shorts
