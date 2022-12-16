import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const EditProfile = () => {
  const navigate = useNavigate();
  const [img, setimg] = useState();
  const [imgPre, setimgPre] = useState("");
  const [userdata, setuserdata] = useState([]);
  const [name, setName] = useState();
  const [bio, setBio] = useState();

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
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimgPre(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setimgPre("");
    }
  }, [img]);

  const profilestateupload = async (event) => {
    setimg(event.target.files[0]);
  };

  const proimage = async () => {
    if (imgPre === "") {
      const res = await fetch("/updateprofileDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          bio,
        }),
      });
      navigate("/profile");
    } else {
      const picdata = new FormData();
      picdata.append("file", img);
      picdata.append("upload_preset", "videos");
      picdata.append("cloud_name", "filtershorts");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/filtershorts/image/upload",
        {
          method: "POST",
          body: picdata,
        }
      );
      const dataaa = await res.json();
      const ress = await fetch("/updateprofilepic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          bio,
          url: dataaa.secure_url,
        }),
      });
      navigate("/profile");
    }
  };
  return (
    <div className="edit_main">
      <div className="edit">
        <div className="edit_header">
          <i
            className="fas fa-times"
            onClick={() => {
              navigate("/profile");
            }}
          ></i>
          <h2>Edit Profile</h2>
          <button className="save_button" onClick={proimage}>
            Save
          </button>
        </div>
        <label htmlFor="pic_upload">
          <div className="profile_pic_center">
            {imgPre === "" && userdata.profilepicimage === "" ? (
              <div className="profile_pic"></div>
            ) : imgPre === "" && userdata.profilepicimage !== "" ? (
              <img
                src={userdata.profilepicimage}
                className="profile_pic"
                alt=""
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={imgPre}
                className="profile_pic"
                style={{ objectFit: "cover" }}
                alt=""
              />
            )}
          </div>
        </label>
        <input
          type="file"
          id="pic_upload"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          onChange={profilestateupload}
        />
        <div className="warning">
          <p>*To Update Your Profile Click on Save Button</p>
        </div>
        <div className="profie_update">
          <div>
            <form className="regi_form" method="POST">
              <div className="regi_in">
                <input
                  type="text"
                  placeholder={userdata.name}
                  className="regi_input_profile"
                  name="name"
                  autoComplete="off"
                  maxLength="27"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="regi_in">
                <input
                  type="text"
                  placeholder={userdata.Bio === "" ? "Bio" : userdata.Bio}
                  className="regi_input_profile"
                  name="bio"
                  autoComplete="off"
                  maxLength="28"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
