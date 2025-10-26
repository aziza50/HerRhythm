import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TopBanner from "../components/TopBanner";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function CheckIn({ userName, onNavigate }) {
  const { user } = useAuth0();
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [motivation, setMotivation] = useState(50);
  const [flow, setFlow] = useState("None");
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodList = ["excited", "happy", "calm", "sad", "anxious"];
  const symptomOptions = ["Cramps", "Headache", "Bloating", "Fatigue", "Acne"];

  const toggleSymptom = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }

    if (!mood) {
      alert("Please select a mood!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Make fetch request to backend
      const response = await fetch("http://localhost:5001/api/tracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth0_id: user.sub,
          mood: mood,
          energy: parseFloat(energy),
          motivation: parseFloat(motivation),
          cycle_flow: flow,
          symptoms: symptoms.join(", "),
          notes: notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit check-in");

      const data = await response.json();

      alert("Check-in submitted successfully!");

      // Reset form
      setMood(null);
      setEnergy(50);
      setMotivation(50);
      setFlow("None");
      setSymptoms([]);
      setNotes("");
    } catch (err) {
      alert("Failed to submit check-in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              How Are You Feeling Today?
            </h1>
            <p className="font-unkempt-regular text-[18px] text-gray-600">
              {today}
            </p>
          </div>

          <div className="relative z-10 flex gap-6 px-4">
            {/* Left Column: Mood, Energy, Motivation, Flow */}
            <div className="flex flex-col gap-4 w-1/2">
              {/* Mood */}
              <div className="relative bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2 text-sm">Mood</h2>
                <div className="flex gap-3">
                  {["😄", "😊", "😐", "😞", "😢"].map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => setMood(moodList[index])}
                      className={`text-2xl p-1 rounded-md transition-all ${
                        mood === moodList[index]
                          ? "bg-pink-300 scale-110"
                          : "hover:bg-pink-100"
                      }`}
                    >
                      {emoji} {/* display only emoji */}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div className="relative bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-1 text-sm">Energy</h2>
                <div className="w-full text-center mb-1">
                  <span className="text-xl font-bold text-pink-500">
                    {energy}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none bg-pink-200"
                  style={{
                    accentColor: "#f687b3",
                  }}
                />
              </div>

              {/* Motivation */}
              <div className="relative bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] -rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-1 text-sm">Motivation</h2>
                <div className="w-full text-center mb-1">
                  <span className="text-xl font-bold text-pink-500">
                    {motivation}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none bg-pink-200"
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
              <div className="relative bg-white rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col items-center">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] rotate-2 shadow-md"></div>
                <h2 className="font-semibold mb-2 text-sm">Symptoms</h2>
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
              <div className="relative bg-white -rotate-1 shadow-[0_4px_10px_0_rgba(90,90,90,0.6)] p-3 flex flex-col flex-grow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-[#f4e9d8] rotate-1 shadow-md"></div>
                <h2 className="font-semibold mb-2 text-sm">Notes</h2>
                <textarea
                  className="w-full flex-grow p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Jot down any thoughts..."
                  rows={4}
                />
              </div>

              <div className="flex justify-center w-full">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded-2xl shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Check-In"}
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
