import express from "express";
import cors from "cors";
import pool from "./db.js"; // Import the pool from db.js

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/users/check", async (req, res) => {
  try {
    const { auth0Id } = req.query;

    if (!auth0Id) {
      return res.status(400).json({ error: "auth0Id is required" });
    }

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE auth0_id = $1",
      [auth0Id]
    );

    const exists = rows.length > 0;

    res.json({ exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  const { auth0_id, name, weight, last_period_date, cycle_length } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (auth0_id, name, weight, last_period_date, cycle_length)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (auth0_id)
       DO UPDATE SET 
         name = EXCLUDED.name, 
         weight = EXCLUDED.weight, 
         last_period_date = EXCLUDED.last_period_date, 
         cycle_length = EXCLUDED.cycle_length
       RETURNING *`,
      [auth0_id, name, weight, last_period_date, cycle_length]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const { auth0Id } = req.query;

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE auth0_id = $1",
      [auth0Id]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ error: "user not found!" });
    }

    res.json({
      name: user.name,
      weight: user.weight,
      last_period_date: user.last_period_date,
      cycle_length: user.cycle_length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
