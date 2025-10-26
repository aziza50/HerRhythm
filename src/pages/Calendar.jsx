import React, { useState, useEffect } from "react";
import TopBanner from "../components/TopBanner";
import { useAuth0 } from "@auth0/auth0-react";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Calendar({ userName, onNavigate }) {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState("");
  const [dayInCycle, setDayInCycle] = useState(0);
  const [daysUntilPeriod, setDaysUntilPeriod] = useState(0);
  const [daysUntilOvulation, setDaysUntilOvulation] = useState(0);
  const [isLoggingPeriod, setIsLoggingPeriod] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedPeriodDate, setSelectedPeriodDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/user?auth0Id=${user.sub}`
          );

          if (!response.ok) throw new Error("User not found");

          const data = await response.json();
          setUserData(data);

          // Calculate phase and cycle info
          if (data.last_period_date && data.cycle_length) {
            const today = new Date();
            const start = new Date(data.last_period_date);

            const diffTime = today - start;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            const currentDay = (diffDays % data.cycle_length) + 1;
            setDayInCycle(currentDay);

            // Set phase
            if (currentDay <= 5) {
              setPhase("menstrual");
            } else if (currentDay < data.cycle_length - 14) {
              setPhase("follicular");
            } else if (currentDay === data.cycle_length - 14) {
              setPhase("ovulation");
            } else {
              setPhase("luteal");
            }

            // Calculate days until events
            setDaysUntilPeriod(data.cycle_length - currentDay);
            setDaysUntilOvulation(data.cycle_length - 14 - currentDay);
          }

          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, user]);

  // Generate calendar days for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleLogPeriod = async () => {
    if (!user) return;

    setIsLoggingPeriod(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/users/update-period",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            auth0_id: user.sub,
            last_period_date: selectedPeriodDate,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update period");

      alert("Period logged successfully!");
      setShowLogModal(false);
      window.location.reload();
    } catch (err) {
      alert("Failed to log period");
    } finally {
      setIsLoggingPeriod(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center">
        <TopBanner onNavigate={onNavigate} />

        <div className="relative w-[900px] min-h-[630px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col px-15 py-6 -mt-4 mb-8">
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          <div className="relative z-10 text-center mb-6 mt-2">
            <h1 className="font-poppins-extrabold text-3xl text-[#2f2f2f]">
              Cycle Calendar
            </h1>
            <p className="text-gray-600">
              {monthNames[currentMonth]} {currentYear}
            </p>
          </div>

          <div className="relative z-10 flex gap-15">
            <div className="flex flex-col gap-5 w-2/3">
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-semibold text-gray-600 p-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`
                        aspect-square flex items-center justify-center text-sm p-2 rounded-lg
                        ${
                          day === null
                            ? "invisible"
                            : day === today.getDate()
                            ? "bg-pink-400 text-white font-bold"
                            : "hover:bg-pink-100 cursor-pointer"
                        }
                      `}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Cycle Info */}
            <div className="flex flex-col gap-5 w-1/3">
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Current Phase</h2>
                <div className="text-center">
                  <div className="text-2xl mb-1">🌱</div>
                  <div className="text-sm font-medium text-pink-600 capitalize">
                    {phase}
                  </div>
                  <div className="text-xs text-gray-500">
                    Day {dayInCycle} of {userData?.cycle_length || 28}
                  </div>
                </div>
              </div>

              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Upcoming</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span>Period in {daysUntilPeriod} days</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
                    <span>Ovulation in {daysUntilOvulation} days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Quick Actions</h2>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    Log Period
                  </button>
                  <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showLogModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Log Your Period
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period Start Date
                </label>
                <input
                  type="date"
                  value={selectedPeriodDate}
                  onChange={(e) => setSelectedPeriodDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select the first day of your period
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogPeriod}
                  disabled={isLoggingPeriod}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoggingPeriod ? "Saving..." : "Log Period"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
