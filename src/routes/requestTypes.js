// src/routes/requestTypes.js
const express = require('express');
const RequestType = require('../models/RequestType');

const router = express.Router();

// GET /api/request-types
router.get('/', async (req, res) => {
  try {
    const types = await RequestType.find({ isActive: true });
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/request-types/:id
router.get('/:id', async (req, res) => {
  try {
    const type = await RequestType.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(type);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/request-types
router.post('/', async (req, res) => {
  try {
    const newType = new RequestType(req.body);
    const saved = await newType.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

module.exports = router;
