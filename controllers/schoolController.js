const db = require('../config/db');

// Add School API
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // SQL Query to insert data
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const values = [name, address, latitude, longitude];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding school:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
};


const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate inputs
  if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  // Convert to float
  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  // Fetch all schools
  const sql = 'SELECT id, name, address, latitude, longitude FROM schools';

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching schools:', err);
          return res.status(500).json({ message: 'Database error' });
      }

      // Calculate distance using Haversine formula
      results.forEach(school => {
          const schoolLat = parseFloat(school.latitude);
          const schoolLng = parseFloat(school.longitude);

          const distance = getDistance(userLat, userLng, schoolLat, schoolLng);
          school.distance = distance; // Add distance to the object
      });

      // Sort by distance (ascending order)
      results.sort((a, b) => a.distance - b.distance);

      res.json(results);
  });
};

// Haversine formula to calculate distance (in km)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = angle => (Math.PI / 180) * angle;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

module.exports = { addSchool, listSchools };




