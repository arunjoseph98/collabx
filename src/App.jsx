import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Editor from "./components/CollabXDocs/Editor";
import Test from "./pages/Test";
import TxtEditor from "./pages/TxtEditor";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/test" element={<TxtEditor/>} />
      </Routes>
    </>
  );
}

export default App;
