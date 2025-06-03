import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const dashBoardNavigateHandler = () => {
    token ? navigate("/dashboard") : navigate("/login");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 lg:py-32">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <span className="block">LinkZip: </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Simplify Your Sharing.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl text-indigo-100"
          >
            Generate short, memorable links in seconds. Track, analyze, and secure  
            your URLs―all from one clean dashboard.
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 
                         text-white font-semibold px-6 py-3 rounded-lg shadow-xl 
                         transform"
            >
              Manage Links
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onClick={dashBoardNavigateHandler}
              className="border-2 border-white hover:border-indigo-300 text-white font-semibold px-6 py-3 rounded-lg 
                         bg-white bg-opacity-10 hover:bg-opacity-20 
                         transform"
            >
              Create Short Link
            </motion.button>
          </div>
        </div>

        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none ">
          <svg
            className="relative block w-full h-16 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Cards */}
      <section className=" py-16 border-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800"
          >
            Why LinkZip?
          </motion.h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Simple URL Shortening"
              desc="Create short, memorable URLs in just a few clicks. Our intuitive interface ensures hassle-free link management."
            />
            <Card
              title="Powerful Analytics"
              desc="Gain deep insights with our dashboard. Track clicks, locations, and referral sources to optimize strategies."
            />
            <Card
              title="Enhanced Security"
              desc="Your links are protected with advanced encryption protocols. Share with confidence and peace of mind."
            />
            <Card
              title="Fast & Reliable"
              desc="Experience lightning-fast redirects and 99.99% uptime with our globally distributed infrastructure."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
