const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db('carRental');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user; // Attach the user payload to the request object
    next();
  });
}

app.post('/register', async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = { fullName, email, username, password };
        const result = await db.collection('users').insertOne(user);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Failed to register user', error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await db.collection('users').findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Failed to login', error: err.message });
  }
}); 



app.get('/my-profile', authenticateToken, async (req, res) => {
    try {
      const user = await db.collection('users').findOne({ username: req.user.username });
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      res.status(200).json({
        fullName: user.fullName,
        email: user.email,
        username: user.username
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
    }
  });

app.get('/rental-cars', async (req, res) => {
    try {
        const {year, color, steering_type, number_of_seats } = req.query;
        
        const filter = {};
        if (year) filter.year = parseInt(year);
        if (color) filter.color = color;
        if (steering_type) filter.steering_type = steering_type;
        if (number_of_seats) filter.number_of_seats = parseInt(number_of_seats);


        const cars = await db.collection('cars').find(filter).sort({ price_per_day: 1 }).toArray();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch cars', error: err.message });
    }
});