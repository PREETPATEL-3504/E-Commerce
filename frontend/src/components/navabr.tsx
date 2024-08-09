import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/hooks";

const Navbar = ({ setIsLoggedIn }: any) => {
  const socket = useAppSelector((store) => store.users.socket);
  const navigate = useNavigate();

  const logOutHnadler = () => {
    setIsLoggedIn(false);

    if (socket) {
      socket.disconnect();
    }

    toast("logged out successfully", { autoClose: 1000 });
    navigate("/login");
    localStorage.clear();
  };
  return (
    <>
      <header className="text-white">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="#" className="font-bold text-xl">
            E-Commerce
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/login"
                onClick={logOutHnadler}
                className="hover:text-gray-400"
              >
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
