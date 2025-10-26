import React from 'react';
import TopBanner from '../components/TopBanner';

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Calendar({ userName, onNavigate }) {
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

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

          <div className="relative z-10 text-center mb-6 mt-2">
            <h1 className="font-unkempt-bold text-[39px] text-[#2f2f2f]">
              Cycle Calendar
            </h1>
            <p className="font-unkempt-regular text-[18px] text-gray-600">{monthNames[currentMonth]} {currentYear}</p>
          </div>

          <div className="relative z-10 flex gap-15">
            {/* Left Column: Calendar */}
            <div className="flex flex-col gap-5 w-2/3">
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`
                        aspect-square flex items-center justify-center text-sm p-2 rounded-lg
                        ${day === null 
                          ? 'invisible' 
                          : day === today.getDate() 
                            ? 'bg-pink-400 text-white font-bold' 
                            : 'hover:bg-pink-100 cursor-pointer'
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
                  <div className="text-sm font-medium text-pink-600">Follicular</div>
                  <div className="text-xs text-gray-500">Day 5 of 28</div>
                </div>
              </div>

              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Upcoming</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span>Period starts in 23 days</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-400 rounded-full mr-2"></div>
                    <span>Ovulation in 9 days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg text-sm">
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
      </div>
    </div>
  );
}

export default Calendar;
