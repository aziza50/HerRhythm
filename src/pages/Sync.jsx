import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TopBanner from "../components/TopBanner";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Sync({ userName, onNavigate }) {
  const { isAuthenticated, user } = useAuth0();
  const [recommendations, setRecommendations] = useState({});
  const [phase, setPhase] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchData = async () => {
        try {
          // First, get user data to determine phase
          const userResponse = await fetch(
            `http://localhost:5001/api/user?auth0Id=${user.sub}`
          );

          if (!userResponse.ok) throw new Error("User not found");

          const userData = await userResponse.json();

          // Calculate phase
          let currentPhase = "follicular";
          if (userData.last_period_date && userData.cycle_length) {
            const today = new Date();
            const start = new Date(userData.last_period_date);
            const diffTime = today - start;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const dayInCycle = (diffDays % userData.cycle_length) + 1;

            if (dayInCycle <= 5) {
              currentPhase = "menstrual";
            } else if (dayInCycle < userData.cycle_length - 14) {
              currentPhase = "follicular";
            } else if (dayInCycle === userData.cycle_length - 14) {
              currentPhase = "ovulation";
            } else {
              currentPhase = "luteal";
            }
          }

          setPhase(currentPhase);

          // Fetch recommendations for current phase
          const recResponse = await fetch(
            `http://localhost:5001/api/recommendation/${currentPhase}`
          );

          if (!recResponse.ok) throw new Error("Recommendations not found");

          const recData = await recResponse.json();

          // Organize recommendations by category
          const organized = {};
          recData.recommendations.forEach((rec) => {
            if (!organized[rec.category]) {
              organized[rec.category] = [];
            }
            organized[rec.category].push(rec.description);
          });

          setRecommendations(organized);
          setLoading(false);
        } catch (err) {
          console.error("❌ Error:", err);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, user]);

  // Category to icon mapping
  const categoryIcons = {
    mood: "/src/assets/images/catread.png",
    productivity: "/src/assets/images/catlaptop.png",
    exercise: "/src/assets/images/catcheer.png",
    nutrition: "/src/assets/images/cateat.png",
  };

  // Category to color mapping
  const categoryColors = {
    mood: "bg-pink-50",
    productivity: "bg-green-50",
    exercise: "bg-orange-50",
    nutrition: "bg-emerald-50",
  };

  // Category display names
  const categoryNames = {
    mood: "Self Care",
    productivity: "Productivity",
    exercise: "Exercise",
    nutrition: "Diet",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

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
              Sync Yourself to Your Cycle
            </h1>
            <p className="font-unkempt-regular text-[18px] text-gray-600">
              Personalized tips for your{" "}
              <span className="capitalize font-bold">{phase}</span> phase
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8 max-w-[800px]">
            {Object.keys(categoryNames).map((category, index) => {
              const rotations = [
                "-rotate-1",
                "rotate-1",
                "rotate-1",
                "-rotate-1",
              ];
              const tapeRotations = [
                "rotate-2",
                "rotate-1",
                "-rotate-1",
                "rotate-1",
              ];

              return (
                <div
                  key={category}
                  className={`relative bg-white ${rotations[index]} shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-6 flex flex-col items-center text-center`}
                >
                  <div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] ${tapeRotations[index]} shadow-md`}
                  ></div>
                  <div className="w-12 h-12 mb-2">
                    <img
                      src={categoryIcons[category]}
                      alt={`${category} icon`}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <h2 className="font-unkempt-bold text-[24px] text-[#2f2f2f] mb-4">
                    {categoryNames[category]}
                  </h2>
                  <div
                    className={`${categoryColors[category]} p-4 rounded-lg w-full`}
                  >
                    {recommendations[category] &&
                    recommendations[category].length > 0 ? (
                      recommendations[category].map((rec, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-gray-700 mb-2 last:mb-0"
                        >
                          {rec}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-700">
                        No recommendations available for this phase
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sync;
