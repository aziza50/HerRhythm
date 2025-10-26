import React from "react";
import TopBanner from "../components/TopBanner";
import Logout from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function HomePage() {
  const { isAuthenticated, isLoading, logout, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/user?auth0Id=${user.sub}`
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
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center">
        <TopBanner />

        <div className="relative w-[900px] h-[640px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col justify-center items-center -mt-4">
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          <div className="relative z-10 text-center">
            <p className="font-poppins-extrabold text-[36px] text-[#2f2f2f] leading-tight tracking-[-1.92px]">
              hello {name?.split(" ")[0]?.toLowerCase() || "friend"},
            </p>
            <p className="font-poppins-extrabold text-[36px] text-[#2f2f2f] leading-tight tracking-[-1.62px]">
              you’re in your {user.phase}
              <span className="text-[#2f2f2f]"> phase!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
