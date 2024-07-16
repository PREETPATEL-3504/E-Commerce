import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({setIsLoggedIn}: any) => {

  const navigate = useNavigate();
  const logOutHnadler = () => {
    setIsLoggedIn(false);
    toast("logged out successfully",{
      autoClose: 1000,
    });
    navigate("/login");
    localStorage.clear();
  };
  return (
    <>
      <header className="text-white">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="#" className="font-bold text-xl">
            My Brand
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="#" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={logOutHnadler} className="hover:text-gray-400">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
