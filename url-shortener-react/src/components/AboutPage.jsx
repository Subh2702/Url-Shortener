import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Simple URL Shortening",
    description:
      "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
    icon: <FaLink className="text-white text-2xl" />,  
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Powerful Analytics",
    description:
      "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
    icon: <FaShareAlt className="text-white text-2xl" />,  
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Enhanced Security",
    description:
      "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
    icon: <FaEdit className="text-white text-2xl" />,  
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Fast and Reliable",
    description:
      "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.",
    icon: <FaChartLine className="text-white text-2xl" />,  
    color: "bg-red-500",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] p-6 lg:p-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
          About LinkZip
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg">
         LinkZip simplifies URL shortening for efficient sharing. Easily generate,
          manage, and track your shortened links with modern analytics and robust security.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            className="flex items-start bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div
              className={`${feature.color} flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-5`}
            >
              {feature.icon}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
