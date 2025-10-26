import React, { useState, useEffect } from "react";
import TopBanner from "../components/TopBanner";
import { useAuth0 } from "@auth0/auth0-react";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Profile({ userName, onNavigate }) {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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

          // Calculate phase
          if (data.last_period_date && data.cycle_length) {
            const today = new Date();
            const start = new Date(data.last_period_date);

            const diffTime = today - start;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            const dayInCycle = diffDays % data.cycle_length;

            if (dayInCycle < 5) {
              setPhase("menstrual");
            } else if (dayInCycle < data.cycle_length - 14) {
              setPhase("follicular");
            } else if (dayInCycle === data.cycle_length - 14) {
              setPhase("ovulation");
            } else {
              setPhase("luteal");
            }
          }

          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  const daysSinceLastPeriod = userData?.last_period_date
    ? Math.floor(
        (new Date() - new Date(userData.last_period_date)) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center">
        <TopBanner onNavigate={onNavigate} />

        <div className="relative w-[900px] h-[640px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col justify-center items-center -mt-4">
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          <div className="relative z-10 text-center mb-8">
            <h1 className="font-unkempt-bold text-[39px] text-[#2f2f2f] mb-2">
              Profile Settings
            </h1>
            <p className="font-unkempt-regular text-[18px] text-gray-600">
              Manage your account and preferences
            </p>
          </div>

          <div className="relative z-10 flex gap-15">
            {/* Left Column: User Info */}
            <div className="flex flex-col gap-10 w-1/2">
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Personal Information</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong>{" "}
                    {userData?.name || user?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Weight:</strong>{" "}
                    {userData?.weight ? `${userData.weight} kg` : "Not set"}
                  </p>
                </div>
              </div>

              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Cycle Settings</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Average Cycle:</strong>{" "}
                    {userData?.cycle_length || 28} days
                  </p>
                  <p>
                    <strong>Last Period:</strong>{" "}
                    {daysSinceLastPeriod !== null
                      ? `${daysSinceLastPeriod} days ago`
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Settings */}
            <div className="flex flex-col gap-5 w-1/2">
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Notifications</h2>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Period reminders
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Ovulation alerts
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Mood check-ins
                  </label>
                </div>
              </div>

              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Account Actions</h2>
                <div className="space-y-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveChanges}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg text-sm"
                      >
                        Edit Profile
                      </button>
                      <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm">
                        Export Data
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
