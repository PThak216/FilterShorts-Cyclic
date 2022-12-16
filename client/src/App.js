import { useEffect } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/fullscreenpost") {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
