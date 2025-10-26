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

app.put("/api/users/update-period", async (req, res) => {
  const { auth0_id, last_period_date } = req.body;

  if (!auth0_id || !last_period_date) {
    return res
      .status(400)
      .json({ error: "Missing auth0_id or last_period_date" });
  }

  try {
    const result = await pool.query(
      `UPDATE users 
       SET last_period_date = $1 
       WHERE auth0_id = $2 
       RETURNING *`,
      [last_period_date, auth0_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/recommendation/:phase", async (req, res) => {
  try {
    const { phase } = req.params;

    const { rows } = await pool.query(
      "SELECT * FROM recommendations WHERE phase = $1",
      [phase]
    );

    res.json({
      phase: phase,
      recommendations: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/tracker", async (req, res) => {
  const { auth0Id } = req.query;

  if (!auth0Id) {
    return res.status(400).json({ error: "auth0Id is required" });
  }

  try {
    const { rows } = await pool.query(
      `SELECT * FROM tracker 
       WHERE auth0_id = $1 
       ORDER BY created_at DESC`,
      [auth0Id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/tracker/:id", async (req, res) => {
  const { id } = req.params;
  const { mood, energy, motivation, cycle_flow, symptoms, notes } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tracker 
       SET mood = $1, energy = $2, motivation = $3, 
           cycle_flow = $4, symptoms = $5, notes = $6
       WHERE id = $7
       RETURNING *`,
      [mood, energy, motivation, cycle_flow, symptoms, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tracker entry not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/tracker", async (req, res) => {
  console.log("Request body:", req.body);

  const { auth0_id, mood, energy, motivation, cycle_flow, symptoms, notes } =
    req.body;

  if (!auth0_id) {
    return res.status(400).json({ error: "auth0_id is required" });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingEntry = await pool.query(
      `SELECT id FROM tracker 
       WHERE auth0_id = $1 
       AND created_at >= $2 
       AND created_at < $3`,
      [auth0_id, today, tomorrow]
    );

    let result;

    if (existingEntry.rows.length > 0) {
      result = await pool.query(
        `UPDATE tracker 
         SET mood = $1, energy = $2, motivation = $3, 
             cycle_flow = $4, symptoms = $5, notes = $6,
             created_at = NOW()
         WHERE id = $7
         RETURNING *`,
        [
          mood,
          energy,
          motivation,
          cycle_flow,
          symptoms,
          notes,
          existingEntry.rows[0].id,
        ]
      );
    } else {
      console.log("➕ Creating new entry");
      result = await pool.query(
        `INSERT INTO tracker (auth0_id, mood, energy, motivation, cycle_flow, symptoms, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [auth0_id, mood, energy, motivation, cycle_flow, symptoms, notes]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
