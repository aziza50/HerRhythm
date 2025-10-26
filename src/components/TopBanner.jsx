"use client";
import React, { useState } from "react";
import Logout from "./LogoutButton";

const TopBanner = ({ onNavigate }) => {
  const tabs = ["Home", "Sync", "Check-In", "Calendar"];
  const [activeTab, setActiveTab] = useState("Home");
  const [disabled, setDisabled] = useState(false);

  const handleClick = (tab) => {
    if (disabled) return;
    setActiveTab(tab);
    onNavigate?.(tab);
    setDisabled(true);
    setTimeout(() => setDisabled(false), 300); // tiny delay to prevent double-click spam
  };

  return (
    <header className="relative w-full z-20 flex flex-col items-center pt-6">
      <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            disabled={disabled}
            className={`
              relative px-5 py-1 rounded-t-2xl font-semibold
              text-[#4a3b2f] transition-all duration-200
              bg-[#fffbe9] shadow-[0_-4px_6px_rgba(0,0,0,0.25)]
              ${
                activeTab === tab
                  ? "opacity-100"
                  : "opacity-90 hover:opacity-100"
              }
              ${disabled ? "cursor-not-allowed" : ""}
            `}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="absolute right-6 top-4 gap-5 flex flex-row">
        <button
          onClick={() => handleClick("Profile")}
          className={`
            bg-[#f4e9d8] px-4 py-2 rounded-full font-medium text-[#4a3b2f]
            shadow-md hover:bg-[#fff5dc] transition
          `}
        >
          Profile
        </button>
        <div
          className={`
            bg-[#f4e9d8] px-4 py-2 rounded-full font-medium text-[#4a3b2f]
            shadow-md hover:bg-[#fff5dc] transition
          `}
        >
          <Logout></Logout>
        </div>
      </div>
    </header>
  );
};

export default TopBanner;
