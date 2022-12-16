import React, { useContext, useState, useEffect, createContext, useReducer } from "react";
import Pusher from "pusher-js"
import { LikesReducer, topicsReducer } from "./Reducer";

const FetchData = createContext();

const FetchDataProvider = ({children}) =>{
const [apidata, setApidata] = useState([]);    
const [newData, setnewData] = useState([]);    

useEffect(()=>{
    const pusher = new Pusher('9a3da9bd7e04a4f72162', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('mainvideos');
    channel.bind('inserted', (data) =>{
      if(data){
        setnewData(data)
      }})
   
      const channelmain = pusher.subscribe('likeupdter');
      channelmain.bind('updated', (dataa) =>{
        if(dataa){
          // console.log(dataa);
          setnewData(dataa)
        } })
 
        const channelfollow = pusher.subscribe('updatingFollow');
        channelfollow.bind('updated', (followData) =>{
          if(followData){
            setnewData(followData)
          }
          
        })

        const channeldelete = pusher.subscribe('deletedata');
        channeldelete.bind('deleted', (deleteData) =>{
          if(deleteData){
            setnewData(deleteData)
          } 
        })
  },[])


  useEffect(()=>{
    const FetchPosts =async () =>{ 

        const res = await fetch('/allposts',{
          method: "GET",
          headers:{
            "Content-Type" : "application/json"
          },
        });
      
        var data = await res.json();
        setApidata(data)
      }
      FetchPosts();

  },[newData])


  const [state, dispatch] = useReducer(LikesReducer, {
    Like: [],
    Unlike:[],
    Follow: [],
    UNFollow: [],
    Bookmark:[],
    UnBookmark:[]
})

const [topicstate, topicdispatch] = useReducer(topicsReducer, {
  query: ""
})


return(
    <FetchData.Provider value={{apidata,state, dispatch, topicstate, topicdispatch, newData}}>
        {children}
    </FetchData.Provider>
    )

}   

export default FetchDataProvider;
export const Postdetails = () =>{
    return useContext(FetchData)
}


