import "./App.css";
import { useState } from "react";
import { Home, Login, Register, Reset } from "./pages";
import { Header, Dashboard } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import IconButton from "@material-ui/core/IconButton";

function App() {
  const [Toggle, setToggle] = useState(true);

  function handleClick() {
    setToggle(!Toggle);
  }

  return (
    <div className={Toggle ? "app" : "dark-mode"}>
      <Router>
        <Header />{" "}
        <div className="darkmode-btn">
          <IconButton
            onClick={handleClick}
            style={{ backgroundColor: "white" }}
          >
            <Brightness4Icon />
          </IconButton>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/publish" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
