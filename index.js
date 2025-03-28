const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const haversine = require("haversine-distance");

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("✅ School Management API is running!");
});

// ✅ Fix: Corrected the endpoint route to "/addSchool"
app.post("/addSchool", (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert into MySQL
  const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "School added successfully", schoolId: result.insertId });
  });
});


app.get("/listSchools", (req, res) => {
  const userLatitude = parseFloat(req.query.latitude);
  const userLongitude = parseFloat(req.query.longitude);

  if (!userLatitude || !userLongitude) {
    return res.status(400).json({ error: "User latitude and longitude are required!" });
  }

  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Calculate distance using Haversine formula
    results.forEach((school) => {
      school.distance = haversine(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: school.latitude, longitude: school.longitude }
      );
    });

    // Sort schools by distance
    results.sort((a, b) => a.distance - b.distance);

    res.json(results);
  });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
