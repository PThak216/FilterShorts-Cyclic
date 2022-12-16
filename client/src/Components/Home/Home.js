import SideHeader from "../SideHeader/SideHeader";
import TopHeader from "../TopHeader/TopHeader";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Upload from "../Upload/Upload";
import Login from "../LoginRegi/Login";
import Register from "../LoginRegi/Register";
import { ToastContainer } from "react-toastify";
import UserProfile from "../Profile/UserProfile";
import EditProfile from "../EditProfile/EditProfile";
import FullScreenPost from "../Profile/FullScreenPost";
import FollowersMain from "../Followers/FollowersMain";
import Followingmain from "../Followers/Followingmain";
import UserFollowers from "../Followers/UserFollowers";
import UserFollowing from "../Followers/UserFollowing";
import Saved from "../Saved/Saved";
import ForYou from "../Shorts/ForYou";
import Following from "../Shorts/Following";
import Connect from "../Connect/Connect";
import Comedy from "../Topics/Comedy";
import Animals from "../Topics/Animals";
import Dance from "../Topics/Dance";
import Gaming from "../Topics/Gaming";
import Sports from "../Topics/Sports";
import Beauty from "../Topics/Beauty";
import Food from "../Topics/Food";
import BottomHeader from "../TopHeader/BottomHeader";
import Logout from "../LoginRegi/Logout";
const Home = () => {
  return (
    <>
      {/* <Router> */}

      <TopHeader />
      <BottomHeader />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ForYou />} />
        <Route exact path="/following" element={<Following />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/followersmain" element={<FollowersMain />} />
        <Route exact path="/followingmain" element={<Followingmain />} />
        <Route path="/userfollowers" element={<UserFollowers />} />
        <Route path="/userfollowing" element={<UserFollowing />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/fullscreenpost" element={<FullScreenPost />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/comedy" element={<Comedy />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/food" element={<Food />} />
        <Route path="/dance" element={<Dance />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <SideHeader />

      {/* </Router> */}
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="light"
      />
    </>
  );
};

export default Home;
