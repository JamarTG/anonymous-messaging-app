import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import SignUp from "./pages/Signup/index";
import SendMessage from "./pages/SendMessage/index";
import NotFound from "./pages/NotFound/index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserContext from "../contexts/userContext";
import Logout from "./components/Logout.jsx";
import PreLoader from "./components/PreLoader";

const Dashboard = lazy(() => import("./pages/Dashboard/index.jsx"));

function App() {
  const [user, setUser] = useState(null);
  // const [userExists , setUserExists] = 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user != null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Suspense fallback={<PreLoader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route path="/send/:username" element={<SendMessage />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : setTimeout(<Login/>)}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
