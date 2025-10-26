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

        <div className="relative w-[900px] min-h-[630px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col px-15 py-6 -mt-4 mb-8">
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          <div className="relative z-10 text-center mb-6 mt-2">
            <h1 className="font-poppins-extrabold text-3xl text-[#2f2f2f]">
              Sync & Integrations
            </h1>
            <p className="text-gray-600">Connect with your favorite apps and devices</p>
          </div>

          <div className="relative z-10 flex gap-15">
            {/* Left Column: Health Apps */}
            <div className="flex flex-col gap-10 w-1/2">
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Health Apps</h2>
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                    <span className="text-sm">Apple Health</span>
                    <button className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded text-xs">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                    <span className="text-sm">Google Fit</span>
                    <button className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded text-xs">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                    <span className="text-sm">Fitbit</span>
                    <button className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded text-xs">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Calendar Apps</h2>
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                    <span className="text-sm">Google Calendar</span>
                    <button className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded text-xs">
                      Connect
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-pink-50 rounded-lg">
                    <span className="text-sm">Outlook</span>
                    <button className="bg-pink-400 hover:bg-pink-500 text-white px-3 py-1 rounded text-xs">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sync Status */}
            <div className="flex flex-col gap-5 w-1/2">
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Sync Status</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Last sync: 2 minutes ago</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Data backed up</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>3 pending updates</span>
                  </div>
                </div>
              </div>

              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Sync Actions</h2>
                <div className="space-y-2">
                  <button className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Sync Now
                  </button>
                  <button className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sync;
