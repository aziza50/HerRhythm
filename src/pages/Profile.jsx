import React, { useState } from 'react';
import TopBanner from '../components/TopBanner';

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function Profile({ userName, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userName,
    email: 'user@example.com',
    averageCycle: 28,
    periodLength: 5,
    lastPeriod: 3
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset to original values
    setProfileData({
      name: userName,
      email: 'user@example.com',
      averageCycle: 28,
      periodLength: 5,
      lastPeriod: 3
    });
    setIsEditing(false);
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
            <p className="font-unkempt-regular text-[18px] text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="relative z-10 flex gap-15">
            {/* Left Column: User Info */}
            <div className="flex flex-col gap-10 w-1/2">
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Personal Information</h2>
                <div className="space-y-2 text-sm w-full">
                  {isEditing ? (
                    <>
                      <div className="flex flex-col">
                        <label className="font-semibold">Name:</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-semibold">Email:</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>Name:</strong> {profileData.name}</p>
                      <p><strong>Email:</strong> {profileData.email}</p>
                    </>
                  )}
                  <p><strong>Member since:</strong> January 2024</p>
                </div>
              </div>

              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Cycle Settings</h2>
                <div className="space-y-2 text-sm w-full">
                  {isEditing ? (
                    <>
                      <div className="flex flex-col">
                        <label className="font-semibold">Average Cycle (days):</label>
                        <input
                          type="number"
                          value={profileData.averageCycle}
                          onChange={(e) => handleInputChange('averageCycle', parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          min="21"
                          max="35"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-semibold">Period Length (days):</label>
                        <input
                          type="number"
                          value={profileData.periodLength}
                          onChange={(e) => handleInputChange('periodLength', parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          min="1"
                          max="10"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-semibold">Days since last period:</label>
                        <input
                          type="number"
                          value={profileData.lastPeriod}
                          onChange={(e) => handleInputChange('lastPeriod', parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          min="0"
                          max="35"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>Average Cycle:</strong> {profileData.averageCycle} days</p>
                      <p><strong>Period Length:</strong> {profileData.periodLength} days</p>
                      <p><strong>Last Period:</strong> {profileData.lastPeriod} days ago</p>
                    </>
                  )}
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
