import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Navbar from "./components/navabr";
import Home from "./components/adminDashboard";
import { useEffect, useState } from "react";
import AdminDashboard from "./components/adminDashboard";
import UserDashboard from "./components/userDashboard";
import AddProducts from "./components/addProducts";
import Cart from "./components/cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") || null
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route
            path="/*"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/user" />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/admin"
            element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/*" />}
          />
          <Route
            path="/user"
            element={isLoggedIn ? <UserDashboard /> : <Navigate to="/*" />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/*"
            element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
          />
          <Route
            path="/add-product"
            element={isLoggedIn ? <AddProducts /> : <Navigate to="/" />}
          />

          <Route
            path="/add-product/:id"
            element={isLoggedIn ? <AddProducts /> : <Navigate to="/" />}
          />

          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
          />

          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
