import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  // Link items ka array for easier maintenance
  const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    token && { name: "Dashboard", to: "/dashboard" },
  ].filter(Boolean);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 h-16">
      <div className="container mx-auto px-4 lg:px-16 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-white text-3xl font-extrabold italic">
            LinkZip
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex items-center space-x-8">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${
                  path === link.to
                    ? "text-white font-semibold"
                    : "text-indigo-200 hover:text-white"
                } transition-colors duration-200`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {!token ? (
            <li>
              <Link
                to="/register"
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                SignUp
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={onLogOutHandler}
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                LogOut
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen((prev) => !prev)}
          className="sm:hidden text-white text-3xl focus:outline-none"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-indigo-700 overflow-hidden"
          >
            <ul className="flex flex-col px-4 pt-4 pb-6 space-y-4">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setNavbarOpen(false)}
                    className={`block ${
                      path === link.to
                        ? "text-white font-semibold"
                        : "text-indigo-200 hover:text-white"
                    } transition-colors duration-200`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {!token ? (
                <li>
                  <Link
                    to="/register"
                    onClick={() => setNavbarOpen(false)}
                    className="block bg-white text-indigo-600 font-semibold text-center px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    SignUp
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      setNavbarOpen(false);
                      onLogOutHandler();
                    }}
                    className="w-full bg-white text-indigo-600 font-semibold text-center px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    LogOut
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
