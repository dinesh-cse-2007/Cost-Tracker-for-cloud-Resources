const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'your_password',
database: 'cloud_cost'
});

db.connect(err => {
if (err) {
console.error('Database connection failed:', err);
return;
}
console.log('Connected to MySQL');
});

// ➕ Add Cost
app.post('/add', (req, res) => {
const { service, provider, cost } = req.body;

const query = "INSERT INTO costs (service, provider, cost) VALUES (?, ?, ?)";

db.query(query, [service, provider, cost], (err, result) => {
    if (err) {
        return res.status(500).json(err);
    }
    res.json({ message: "Cost added successfully" });
});

});

// 📥 Get All Costs
app.get('/get', (req, res) => {
db.query("SELECT * FROM costs", (err, results) => {
if (err) {
return res.status(500).json(err);
}
res.json(results);
});
});

// ❌ Delete Cost
app.delete('/delete/:id', (req, res) => {
const id = req.params.id;

db.query("DELETE FROM costs WHERE id = ?", [id], (err, result) => {
    if (err) {
        return res.status(500).json(err);
    }
    res.json({ message: "Deleted successfully" });
});

});

// 🚀 Start Server
app.listen(5000, () => {
console.log('Server running on http://localhost:5000');
});
