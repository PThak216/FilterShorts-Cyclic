import React, { useContext, useEffect, createContext, useReducer } from "react";
import Pusher from "pusher-js";
import { LikesReducer, topicsReducer } from "./Reducer";

const FetchData = createContext();

const FetchDataProvider = ({ children }) => {
  useEffect(() => {
    const pusher = new Pusher("9a3da9bd7e04a4f72162", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("mainvideos");
    channel.bind("inserted", (data) => {
      if (data) {
      }
    });

    const channelmain = pusher.subscribe("likeupdter");
    channelmain.bind("updated", (dataa) => {
      if (dataa) {
      }
    });

    const channelfollow = pusher.subscribe("updatingFollow");
    channelfollow.bind("updated", (followData) => {
      if (followData) {
      }
    });

    const channeldelete = pusher.subscribe("deletedata");
    channeldelete.bind("deleted", (deleteData) => {
      if (deleteData) {
      }
    });
  }, []);

  const [state, dispatch] = useReducer(LikesReducer, {
    Like: [],
    Unlike: [],
    Follow: [],
    UNFollow: [],
    Bookmark: [],
    UnBookmark: [],
  });

  const [topicstate, topicdispatch] = useReducer(topicsReducer, {
    query: "",
  });

  return (
    <FetchData.Provider value={{ state, dispatch, topicstate, topicdispatch }}>
      {children}
    </FetchData.Provider>
  );
};

export default FetchDataProvider;
export const Postdetails = () => {
  return useContext(FetchData);
};
