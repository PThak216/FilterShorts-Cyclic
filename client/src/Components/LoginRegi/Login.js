import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid");
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      navigate("/");
    }
  };

  const guestuser = async (e) => {
    e.preventDefault();
    const Eval = "trial@gmail.com";
    setEmail(Eval);
    const Pass = "password@123";
    setPassword(Pass);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Eval,
        password: Pass,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid");
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      //  dispatch({type:"USER", payload:true})
      navigate("/");
    }
  };
  return (
    <>
      <div className="regi_main">
        <div className="loginbg"></div>
        <div className="regi">
          <div className="regi_name" style={{ marginBottom: "30px" }}>
            <h1>Login</h1>
          </div>
          <form className="regi_form" method="POST">
            <div className="regi_in">
              <input
                type="email"
                placeholder="Email"
                className="regi_input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="Password"
                placeholder="Password"
                className="regi_input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="regi_button">
            <button className="regi_button_test" onClick={guestuser}>
              {" "}
              Guest Login
            </button>
            <button className="regi_button_main" onClick={loginuser}>
              {" "}
              Login
            </button>

            <button
              className="regi_button_main"
              onClick={() => navigate("/register")}
            >
              {" "}
              Not Registered? Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
