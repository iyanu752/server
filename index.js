require('dotenv').config();
const express = require ('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())
connectDB();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes')
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)
module.exports = app;



