import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { auth0_id, name, weight, last_period_date, cycle_length } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (auth0_id, name, weight, last_period_date)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (auth0_id)
       DO UPDATE SET name = EXCLUDED.name, weight = EXCLUDED.weight, last_period_date = EXCLUDED.last_period_date
       RETURNING *`,
      [auth0_id, name, weight, last_period_date, cycle_length]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/api/users/check", async (req, res) => {
  const { auth0Id } = req.query;

  const user = await db.users.findOne({ where: { auth0Id } });
  res.json({ exists: !!user });
});

app.get("/api/user/", async (req, res) => {
  const { auth0Id } = req.query;

  const user = await db.users.findOne({ where: { auth0Id } });

  if (!user) {
    return res.status(404).json({ error: "user not found!" });
  }

  res.json({
    name: user.name,
    weight: user.weight,
    last_period_date: user.last_period_date,
    cycle_length: user.cycle_length,
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
