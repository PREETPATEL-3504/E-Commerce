import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Navbar from "./components/common/navabr";
import Home from "./components/admin/adminDashboard";
import { useEffect, useState } from "react";
import AdminDashboard from "./components/admin/adminDashboard";
import UserDashboard from "./components/user/userDashboard";
import AddProducts from "./components/admin/addProducts";
import Cart from "./components/user/userCart";
import io from "socket.io-client";
import { useAppDispatch } from "./store/hooks";
import { setSocket } from "./store/reducers/userSlice";
import OrderList from "./components/admin/adminOrderList";
import UserOrderList from "./components/user/userOrderList";
import Orderdetails from "./components/admin/orderDetails";
import { UserWishList } from "./components/user/userWishList";

function App() {
  const ENDPOINT = "http://localhost:5000";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") || null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const id = localStorage.getItem("id");
  useEffect(() => {
    if (id) {
      const socket: any = io(ENDPOINT);
      dispatch(setSocket(socket));
    }
  }, [id]);

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

          <Route
            path="/order"
            element={isLoggedIn ? <OrderList /> : <Navigate to="/" />}
          />
          <Route
            path="/user-order"
            element={isLoggedIn ? <UserOrderList /> : <Navigate to="/" />}
          />
          <Route
            path="/order-details/:id"
            element={isLoggedIn ? <Orderdetails /> : <Navigate to="/" />}
          />

          <Route
            path="/wish-lists"
            element={isLoggedIn ? <UserWishList /> : <Navigate to="/" />}
          />

          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
