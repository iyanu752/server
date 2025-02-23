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
const dashStatRoutes = require('./routes/dashStatRoutes')
const emailRoute = require('./routes/emailRoute')
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)
app.use('/api/dashstat', dashStatRoutes)
app.use('/api/email', emailRoute)
module.exports = app;



