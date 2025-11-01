require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const errorHandler = require('./middleware/error');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/files', express.static('uploads'), fileRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
