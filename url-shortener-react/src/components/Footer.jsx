import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 relative">
      <div className="container mx-auto px-4 lg:px-16 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Left Section: Brand */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 mb-2">
            LinkZip
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base">
            Simplifying URL shortening for efficient sharing
          </p>
        </div>

        {/* Center Section: Copyright */}
        <p className="text-indigo-200 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} LinkZip. All rights reserved.
        </p>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-6">
          {[
            { icon: <FaFacebook />, href: "#" },
            { icon: <FaTwitter />, href: "#" },
            { icon: <FaInstagram />, href: "#" },
            { icon: <FaLinkedin />, href: "#" },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-indigo-100 hover:text-white text-xl"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
