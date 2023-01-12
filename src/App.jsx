import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Landing, Signup, Profile } from "./views";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
