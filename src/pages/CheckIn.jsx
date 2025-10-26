import React, { useState } from "react";
import TopBanner from "../components/TopBanner";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b"; // background
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a"; // notebook paper

function CheckIn({ userName, onNavigate }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [motivation, setMotivation] = useState(50);
  const [flow, setFlow] = useState("None");
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState("");

  const moodOptions = [
    { emoji: "😄", name: "excited" },
    { emoji: "😊", name: "happy" },
    { emoji: "😐", name: "calm" },
    { emoji: "😞", name: "sad" },
    { emoji: "😢", name: "anxious" },
  ];

  const symptomOptions = ["Cramps", "Headache", "Bloating", "Fatigue", "Acne"];

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    console.log({ mood, energy, motivation, flow, symptoms, notes });
  };

  const today = new Date().toLocaleDateString();

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
              how are you feeling today?
            </h1>
            <p className="font-unkempt-regular text-[18px] text-gray-600">{today}</p>
          </div>

          <div className="relative z-10 flex gap-8 px-6">
            {/* Left Column: Mood, Energy, Motivation, Flow */}
            <div className="flex flex-col gap-6 w-1/2">
              {/* Mood */}
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-3">Mood</h2>
                <div className="flex gap-3">
                  {moodOptions.map(({ emoji, name }) => (
                    <button
                      key={name} // word tied to emoji
                      title={name} // tooltip shows word on hover
                      onClick={() => setMood(name)}
                      className={`text-xl p-2 rounded-md ${
                        mood === name ? "bg-pink-200" : ""
                      }`}
                    >
                      {emoji} {/* display only emoji */}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-3">Energy</h2>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none bg-pink-200 accent-pink-500"
                  style={{
                    accentColor: "#f687b3",
                  }}
                />
              </div>

              {/* Motivation */}
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] -rotate-1 shadow-md"></div>
                <h2 className="font-semibold text-sm mb-2">Motivation</h2>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none bg-pink-200 accent-pink-500"
                  style={{
                    accentColor: "#f687b3",
                  }}
                />
              </div>

              {/* Cycle Flow */}
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold text-sm mb-2">Cycle Flow</h2>
                <div className="flex gap-1 justify-center flex-wrap">
                  {["None", "Spotting", "Light", "Medium", "Heavy"].map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => setFlow(level)}
                        className={`px-2 py-1 rounded-md transition-all duration-200 font-medium text-xs
                          ${
                            flow === level
                              ? "bg-pink-300 text-white shadow-md"
                              : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                          }
                        `}
                      >
                        {level}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Symptoms & Notes */}
            <div className="flex flex-col gap-4 w-1/2">
              {/* Symptoms */}
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold text-sm mb-2">Symptoms</h2>
                <div className="flex gap-2 flex-wrap justify-center">
                  {symptomOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`px-2 py-1 rounded-md transition-all duration-200 text-xs
                        ${
                          symptoms.includes(s)
                            ? "bg-pink-300 text-white shadow-md"
                            : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col relative">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-3">Notes</h2>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Jot down any thoughts..."
                />
              </div>

              <div className="flex justify-center w-full mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-2xl shadow-md"
                >
                  Submit Check-In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;