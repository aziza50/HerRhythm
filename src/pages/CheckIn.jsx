import React, { useState } from "react";
import TopBanner from "../components/TopBanner";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b"; // background
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a"; // notebook paper

function CheckIn({ userName }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [motivation, setMotivation] = useState(50);
  const [flow, setFlow] = useState("None");
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState("");

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
        <TopBanner />

        <div className="relative w-[900px] min-h-[630px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col px-15 py-6 -mt-4 mb-8">
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          <div className="relative z-10 text-center mb-6 mt-2">
            <h1 className="font-poppins-extrabold text-3xl text-[#2f2f2f]">
              how are you feeling today?
            </h1>
            <p className="text-gray-600">{today}</p>
          </div>

          <div className="relative z-10 flex gap-15">
            {/* Left Column: Mood, Energy, Motivation, Flow */}
            <div className="flex flex-col gap-8 w-1/2">
              {/* Mood */}
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-2 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold">Mood</h2>
                <div className="flex gap-4">
                  {["😄", "😊", "😐", "😞", "😢"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setMood(emoji)}
                      className={`text-2xl p-2 rounded-md ${
                        mood === emoji ? "bg-pink-200" : ""
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Energy</h2>
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
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] -rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Motivation</h2>
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
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-2 px-5 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Cycle Flow</h2>
                <div className="flex gap-2 justify-center flex-wrap pb-2">
                  {["None", "Spotting", "Light", "Medium", "Heavy"].map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => setFlow(level)}
                        className={`px-3 py-1 rounded-md transition-all duration-200 font-medium
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
            <div className="flex flex-col gap-5 w-1/2">
              {/* Symptoms */}
              <div className="bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col items-center">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2">Symptoms</h2>
                <div className="flex gap-3 flex-wrap justify-center">
                  {symptomOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`px-3 py-1 rounded-md transition-all duration-200 
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
              <div className="bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-4 flex flex-col">
                <div className="absolute -top-3 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2">Notes</h2>
                <textarea
                  className="w-full h-45 p-2 border border-gray-300 rounded-md"
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