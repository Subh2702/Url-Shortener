import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import { Hourglass } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import Graph from "./Graph";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );

  const toggleAnalytics = (url) => {
    if (!analyticToggle) {
      setSelectedUrl(url);
    } else {
      setAnalyticsData([]);
      setSelectedUrl("");
    }
    setAnalyticToggle((prev) => !prev);
  };

  const fetchAnalytics = async () => {
    if (!selectedUrl) return;
    setIsFetchingAnalytics(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
    } catch (error) {
      console.error(error);
      navigate("/error");
    } finally {
      setIsFetchingAnalytics(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
    >
      {/* Main Item Content */}
      <div className="px-6 py-5 sm:flex sm:justify-between sm:items-center">
        <div className="flex-1 space-y-4">
          {/* Short Link & Icon */}
          <div className="flex items-center gap-2">
            <Link
              to={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
              target="_blank"
              className="text-indigo-600 font-semibold text-lg hover:underline"
            >
              {subDomain}/s/{shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-indigo-600" />
          </div>

          {/* Original URL */}
          <p className="text-slate-700 break-all text-sm">{originalUrl}</p>

          {/* Click Count & Created Date */}
          <div className="flex flex-wrap gap-8 items-center text-slate-800">
            <div className="flex items-center gap-1 text-green-700 font-medium">
              <MdOutlineAdsClick className="text-xl" />
              <span className="text-base">{clickCount}</span>
              <span className="text-sm">
                {clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FaRegCalendarAlt />
              <span className="text-sm">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <CopyToClipboard
            text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
            onCopy={() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 
                         text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              <span>{isCopied ? "Copied" : "Copy"}</span>
              {isCopied ? (
                <LiaCheckSolid className="text-lg" />
              ) : (
                <IoCopy className="text-lg" />
              )}
            </motion.button>
          </CopyToClipboard>

          <motion.button
            onClick={() => toggleAnalytics(shortUrl)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 
                       text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
          >
            <span>{analyticToggle ? "Hide Analytics" : "Analytics"}</span>
            <MdAnalytics className="text-lg" />
          </motion.button>
        </div>
      </div>

      {/* Analytics Section (Expandable) */}
      <AnimatePresence>
        {analyticToggle && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t bg-gray-50 p-6 relative"
          >
            {isFetchingAnalytics ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Hourglass
                  visible={true}
                  height="50"
                  width="50"
                  ariaLabel="hourglass-loading"
                  colors={["#4f46e5", "#818cf8"]}
                />
                <p className="mt-2 text-slate-600">Loading analytics…</p>
              </div>
            ) : analyticsData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <h2 className="text-slate-800 font-semibold text-xl mb-2">
                  No Data For This Time Period
                </h2>
                <p className="text-slate-600 text-center px-4">
                  Share your short link to view where engagements are coming
                  from.
                </p>
              </div>
            ) : (
              <div className="h-64">
                <Graph graphData={analyticsData} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShortenItem;
