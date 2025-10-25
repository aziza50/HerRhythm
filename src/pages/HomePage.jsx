import React from "react";
import Logout from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
// Figma asset URLs
const imgHomePage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const imgImg25951 =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function HomePage() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:5173/api/user?auth0Id=${encodeURIComponent(
              user.sub
            )}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) throw new Error("User not found");

          const data = await response.json();
        } catch (err) {
          console.error(err);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, user]);

  let phase;
  let lastPeriodDate = user.lastPeriodDate;
  let cycleLength = user.cycleLength;
  let name = user.name;

  if (lastPeriodDate && cycleLength) {
    const today = new Date();
    const start = new Date(lastPeriodDate);

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const dayInCycle = diffDays % cycleLength;

    if (dayInCycle < 5) {
      phase = "Menstrual";
    } else if (dayInCycle < cycleLength - 14) {
      phase = "Follicular";
    } else if (dayInCycle === cycleLength - 14) {
      phase = "Ovulation";
    } else {
      phase = "Luteal";
    }
  }
  return (
    <div
      className="bg-[#b5d96c] relative w-full min-h-screen flex flex-col"
      data-name="Home"
      data-node-id="13:15"
    >
      {/* Navigation Tabs */}
      <Logout></Logout>
      <div
        className="flex justify-center items-center pt-[53px] pb-4"
        data-node-id="1:2283"
      >
        <div className="flex gap-[18px] items-center">
          <div
            className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] w-[169px]"
            data-node-id="1:2284"
          />
          <div
            className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] w-[169px]"
            data-node-id="1:2296"
          />
          <div
            className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] w-[169px]"
            data-node-id="1:2298"
          />
          <div
            className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] w-[169px]"
            data-node-id="1:2300"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex justify-center items-center px-4 py-8"
        data-name="HomePage"
        data-node-id="13:16"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <img
            alt=""
            className="w-full h-full object-cover"
            src={imgHomePage}
          />
        </div>

        {/* Main Content Frame */}
        <div className="relative w-full max-w-[897px] h-[650px] flex justify-center items-center">
          {/* Background overlay frame */}
          <div
            className="absolute inset-0 bg-[rgba(99,80,68,0.68)] rounded-[64px] shadow-[0px_10px_0px_1px_#4f564c]"
            data-node-id="13:17"
          >
            {/* Background image with blend mode */}
            <div className="absolute inset-0 overflow-hidden rounded-[64px]">
              <div className="absolute inset-0 mix-blend-luminosity">
                <img
                  alt=""
                  className="w-full h-full object-cover mix-blend-overlay"
                  src={imgImg25951}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 p-8 text-center">
            <div
              className="font-poppins-extrabold text-[64px] text-black leading-tight tracking-[-1.92px]"
              data-node-id="13:24"
            >
              <p className="mb-2">hello [name],</p>
              <p className="mb-2">you're in your</p>
              <p>
                <span className="text-[#458a32]">follicular</span>
                <span> phase!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
