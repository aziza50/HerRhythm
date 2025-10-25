import React from "react";
import { useState } from "react";
export default function SignUp() {
  const { user, isAuthenticated } = useAuth0();
  const [weight, setWeight] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) return alert("Log in first!");

    try {
      const response = await fetch("http://localhost:5137/api/users", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth0_id: user.sub,
          name: user.name || user.email,
          weight,
          last_period_date: lastPeriodDate,
        }),
      });

      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter your weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <input
        type="date"
        value={lastPeriodDate}
        onChange={(e) => setLastPeriodDate(e.target.value)}
        required
      ></input>
      <input
        type="number"
        value={cycleLength}
        placeholder="Enter your average cycle length"
        onChange={(e) => setCycleLength(e.target.value)}
        required
      ></input>
      <button type="submit">Save</button>
    </form>
  );
}
