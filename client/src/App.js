import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <BrowserRouter>
      {/* SHOW Navbar */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
