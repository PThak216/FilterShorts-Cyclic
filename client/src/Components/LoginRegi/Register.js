import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, username, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
        cpassword,
      }),
    });
    // dispatch({type:"USER", payload:true})
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Unseccessfull");
      console.log("invalid");
    } else {
      navigate("/login");
      toast.success("Registered Successfully");
    }
  };

  return (
    <>
      <div className="regi_main">
        <div className="loginbg"></div>
        <div className="regi" style={{ height: "39rem", width: "28rem" }}>
          <div className="regi_name">
            <h1>Register</h1>
          </div>

          <form className="regi_form" method="POST">
            <div className="regi_in">
              <input
                type="text"
                placeholder="Name"
                className="regi_input"
                name="name"
                value={user.name}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="email"
                placeholder="Email"
                className="regi_input"
                name="email"
                value={user.email}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="text"
                placeholder="Username"
                className="regi_input"
                name="username"
                value={user.username}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="text"
                placeholder="Password"
                className="regi_input"
                name="password"
                value={user.password}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="text"
                placeholder="Confirm Password"
                className="regi_input"
                name="cpassword"
                value={user.cpassword}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="regi_button">
            <button className="regi_button_main" onClick={postData}>
              {" "}
              Register
            </button>
            <button
              className="regi_button_main"
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Already Registered? Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
