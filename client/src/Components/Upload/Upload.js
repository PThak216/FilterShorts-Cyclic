import React, { useEffect, useState } from "react";
import "./Upload.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const Upload = () => {
  const [video, setvideo] = useState();
  const [videoPre, setvideoPre] = useState("");
  const [caption, setcaption] = useState("");
  const [catogory, setcatogory] = useState("public");
  const [allcatogory, setallcatogory] = useState("Comedy");

  const navigate = useNavigate();

  const upload = (event) => {
    if (event.target.files[0].size <= "10485760") {
      setvideo(event.target.files[0]);
    } else {
      toast.error("Please Upload less than 10 MB Videos");
    }
  };

  useEffect(() => {
    if (video) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setvideoPre(reader.result);
      };
      reader.readAsDataURL(video);
    } else {
      setvideoPre("");
    }
  }, [video]);

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
        // setUserDetails(user)
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
  }, []);

  const uploadvideo = async () => {
    if (videoPre === "") {
      toast.info("Please select the video");
    } else {
      const newvideo = {
        id: new Date().getTime().toString(),
        caption: caption,
      };
      setcaption("");
      setvideoPre("");

      toast.info("Uploading", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      const data = new FormData();
      data.append("file", video);
      data.append("upload_preset", "videos");
      data.append("cloud_name", "filtershorts");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/filtershorts/video/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const video_url = await res.json();
      console.log(video_url.secure_url);
      const ress = await fetch("/upload_video_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          t_id: newvideo.id,
          caption: newvideo.caption,
          url: video_url.secure_url,
          display: catogory,
          catogory: allcatogory,
        }),
      });

      const videodata = await ress.json();

      if (res.status === 422 || !videodata) {
        console.log("invalid");
      } else {
        toast.success("Uploaded");
        console.log("hogaya");
      }
    }
  };

  const discard = () => {
    setvideoPre("");
    setcaption("");
    setcatogory("public");
    setallcatogory("Comedy");
  };
  return (
    <div className="upload">
      <div className="upload_Sec">
        <div className="upload_header">
          <h3>Upload Videos</h3>
          <p>Post Video To Your Account</p>
        </div>
        <div className="upload_videos">
          {videoPre === "" ? (
            <>
              <label htmlFor="upload_area">
                <div className="upload_area">
                  <i className="fas fa-cloud-upload-alt"> </i>
                  <h4>Select Video to Upload</h4>
                  <p>Mp4 only</p>
                  <p>Less than 10 MB</p>
                </div>
              </label>
            </>
          ) : (
            <>
              <div className="videopre">
                <video src={videoPre} autoPlay="autoplay" muted />
              </div>
            </>
          )}

          <input
            type="file"
            id="upload_area"
            onChange={upload}
            accept="video/mp4"
          />
          <div className="upload_details">
            <label htmlFor="caption" className="label">
              <h4>Caption</h4>
            </label>

            <TextareaAutosize
              className="caption"
              value={caption}
              id="caption"
              maxLength="150"
              spellCheck="false"
              onChange={(e) => setcaption(e.target.value)}
              minRows={1.5}
              maxRows={3}
            />
            <div className="categories">
              <label htmlFor="catogory" className="labelcat">
                <h3>Categories:</h3>{" "}
              </label>
              <select
                name="catogory"
                className="select"
                onChange={(e) => setallcatogory(e.target.value)}
              >
                <option value="Comedy">Comedy</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
                <option value="Animal">Animal</option>
                <option value="Beauty">Beauty</option>
                <option value="Dance">Dance</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
            {/* <div className="checkboxes">
              <label htmlFor="radiobtn">Public</label>
              <input
                type="checkbox"
                id="radiobtn"
                onChange={() => setcatogory("public")}
                className="public"
                checked={catogory === "public" ? true : false}
              />
              <label htmlFor="radiobtnn">Friends</label>
              <input
                type="checkbox"
                id="radiobtnn"
                onChange={() => setcatogory("friends")}
                className="public"
                checked={catogory === "friends" ? true : false}
              />
            </div> */}
            {videoPre === "" ? (
              <button className="postbtn">Post</button>
            ) : (
              <div className="allbtn">
                <button
                  className="postbtn"
                  disabled={videoPre === ""}
                  onClick={uploadvideo}
                >
                  Post
                </button>
                <button className="discard" onClick={discard}>
                  Discard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
