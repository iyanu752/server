const express = require ('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())
connectDB();
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
module.exports = app;



