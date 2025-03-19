import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Xdocs from "./pages/Xdocs";
import useAuthStore from "./store/useAuthStore";
import UserProfile from "./pages/UserProfile";
import XdocsEditor from "./pages/XdocsEditor";

function App() {
  const { isAuth } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={isAuth ? <UserProfile /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/docs"
          element={isAuth ? <Xdocs /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/docs/:docId"
          element={isAuth ? <XdocsEditor /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
