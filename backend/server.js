const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model.js'); // Import the schema
const bodyParser = require('body-parser');
const path=require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(
    cors({
        origin: ['http://127.0.0.1:5500'],
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials','Authorization'],
        credentials: true,
        preflightContinue:false,
   }),
  );

const PORT = 3000;
app.use(cors());
app.use(express.static(path.join(__dirname)));
   
// Middleware
app.use(bodyParser.json());

app.use(express.json());


// MongoDB connection
mongoose
  .connect('mongodb+srv://akashkarlapudi24:Akash1414@cluster0.amm89e4.mongodb.net/usersdb?retryWrites=true&w=majority&appName=Cluster0',
     { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection failed:', err));


  app.post('/students', async (req, res) => {
    try {
      const { name, email, password, Phonenumber } = req.body;
      if (!name || !email || !password || !Phonenumber) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      const student = new Student({ ...req.body, password: hashedPassword });
  
      const savedStudent = await student.save();
      res.status(201).json(savedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  const router = express.Router();

  router.post('/login', async (req, res) => {
    try {
      const { name, password } = req.body;
  
      // Validate input
      if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
      }
  
      // Find the user by name
      const user = await Student.findOne({ name });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET_KEY || 'default_secret_key',
        { expiresIn: '1h' } // Token expiration time
      );
  
      // Respond with token and user information
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;

  // Protected route (example)
  app.get('/protected', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the JWT token
      const user = await Student.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});