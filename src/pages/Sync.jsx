import React from 'react';
import TopBanner from '../components/TopBanner';

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Sync({ userName, onNavigate }) {
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
            <p className="font-unkempt-regular text-[18px] text-gray-600">Personalized tips to align with your natural rhythm</p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8 max-w-[800px]">
            {/* Self Care Tips */}
            <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-6 flex flex-col items-center text-center">
              <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
              <h2 className="font-unkempt-bold text-[24px] text-[#2f2f2f] mb-4">🌸 Self Care</h2>
              <div className="bg-pink-50 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-700">
                  Focus on gentle stress relief and warm baths during your luteal phase
                </p>
              </div>
            </div>

            {/* Productivity Tips */}
            <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-6 flex flex-col items-center text-center">
              <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
              <h2 className="font-unkempt-bold text-[24px] text-[#2f2f2f] mb-4">💼 Productivity</h2>
              <div className="bg-green-50 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-700">
                  Plan routine tasks and gentle organizing for your current energy level
                </p>
              </div>
            </div>

            {/* Exercise Tips */}
            <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-6 flex flex-col items-center text-center">
              <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] -rotate-1 shadow-md"></div>
              <h2 className="font-unkempt-bold text-[24px] text-[#2f2f2f] mb-4">🏃‍♀️ Exercise</h2>
              <div className="bg-orange-50 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-700">
                  Gentle yoga or walking is perfect for your current cycle phase
                </p>
              </div>
            </div>

            {/* Diet Tips */}
            <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-6 flex flex-col items-center text-center">
              <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
              <h2 className="font-unkempt-bold text-[24px] text-[#2f2f2f] mb-4">🥗 Diet</h2>
              <div className="bg-emerald-50 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-700">
                  Include magnesium-rich foods and warm, nourishing meals today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sync;
