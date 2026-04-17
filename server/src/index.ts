import cors from "cors";
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 3001;

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS actors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      author TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ttps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);
});

app.get("/api/reports", (req, res) => {
  db.all("SELECT * FROM reports", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/reports", (req, res) => {
  const { name, author } = req.body;
  db.run(
    "INSERT INTO reports (name, author) VALUES (?, ?)",
    [name, author],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get("/api/ttps", (req, res) => {
  db.all("SELECT * FROM ttps", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/ttps", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO ttps (name, description) VALUES (?, ?)",
    [name, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get("/api/actors", (req, res) => {
  db.all("SELECT * FROM actors", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/actors", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO actors (name, description) VALUES (?, ?)",
    [name, description || null],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.delete("/api/actors/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM actors WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Actor not found" });
      return;
    }
    res.json({ message: "Actor deleted" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
