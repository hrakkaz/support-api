require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const requestTypesRoutes = require('./routes/requestTypes');

const app = express();

app.use(express.json());

// Health check (servira pour les tests / étape 6)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes API
app.use('/api/request-types', requestTypesRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  start();
}

module.exports = app;
