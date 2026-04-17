import cors from "cors";
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 3001;

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
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

  db.run(`
    CREATE TABLE IF NOT EXISTS actor_reports (
      actor_id INTEGER NOT NULL,
      report_id INTEGER NOT NULL,
      PRIMARY KEY (actor_id, report_id),
      FOREIGN KEY (actor_id) REFERENCES actors(id) ON DELETE CASCADE,
      FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS report_ttps (
      report_id INTEGER NOT NULL,
      ttp_id INTEGER NOT NULL,
      PRIMARY KEY (report_id, ttp_id),
      FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE,
      FOREIGN KEY (ttp_id) REFERENCES ttps(id) ON DELETE CASCADE
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

app.get("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM reports WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json(row);
  });
});

app.put("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const { name, author } = req.body;
  db.run(
    "UPDATE reports SET name = ?, author = ? WHERE id = ?",
    [name, author, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Report not found" });
        return;
      }
      res.json({ message: "Report updated" });
    }
  );
});

app.delete("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM reports WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json({ message: "Report deleted" });
  });
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

app.get("/api/ttps/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM ttps WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "TTP not found" });
      return;
    }
    res.json(row);
  });
});

app.put("/api/ttps/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run(
    "UPDATE ttps SET name = ?, description = ? WHERE id = ?",
    [name, description, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "TTP not found" });
        return;
      }
      res.json({ message: "TTP updated" });
    }
  );
});

app.delete("/api/ttps/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM ttps WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "TTP not found" });
      return;
    }
    res.json({ message: "TTP deleted" });
  });
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

app.get("/api/actors/:id/reports", (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT r.* FROM reports r
     JOIN actor_reports ar ON r.id = ar.report_id
     WHERE ar.actor_id = ?`,
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.post("/api/actors/:id/reports", (req, res) => {
  const { id } = req.params;
  const { report_id } = req.body;
  db.run(
    "INSERT OR IGNORE INTO actor_reports (actor_id, report_id) VALUES (?, ?)",
    [id, report_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Actor-report link created" });
    }
  );
});

app.delete("/api/actors/:id/reports/:reportId", (req, res) => {
  const { id, reportId } = req.params;
  db.run(
    "DELETE FROM actor_reports WHERE actor_id = ? AND report_id = ?",
    [id, reportId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Link not found" });
        return;
      }
      res.json({ message: "Actor-report link removed" });
    }
  );
});

app.get("/api/reports/:id/ttps", (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT t.* FROM ttps t
     JOIN report_ttps rt ON t.id = rt.ttp_id
     WHERE rt.report_id = ?`,
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.post("/api/reports/:id/ttps", (req, res) => {
  const { id } = req.params;
  const { ttp_id } = req.body;
  db.run(
    "INSERT OR IGNORE INTO report_ttps (report_id, ttp_id) VALUES (?, ?)",
    [id, ttp_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Report-TTP link created" });
    }
  );
});

app.delete("/api/reports/:reportId/ttps/:ttpId", (req, res) => {
  const { reportId, ttpId } = req.params;
  db.run(
    "DELETE FROM report_ttps WHERE report_id = ? AND ttp_id = ?",
    [reportId, ttpId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Link not found" });
        return;
      }
      res.json({ message: "Report-TTP link removed" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
