import "./App.css";
import { Home, Login, Register, Reset } from "./pages";
import { Header, Dashboard } from "./components";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
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
