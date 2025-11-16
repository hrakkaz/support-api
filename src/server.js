require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

if (require.main === module) {
  start();
}

module.exports = app;
