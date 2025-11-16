require('dotenv').config();
const mongoose = require('mongoose');
const RequestType = require('../src/models/RequestType');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-api';

const seed = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding');

    await RequestType.deleteMany({});

    const data = [
      {
        code: 'TECH_ISSUE',
        name: 'Problème technique',
        description: 'Problème technique avec le produit ou le service',
        priority: 'high',
        category: 'Technique',
        estimatedResponseTime: 4,
      },
      {
        code: 'BILLING_QUESTION',
        name: 'Question de facturation',
        description: 'Questions sur la facturation ou les paiements',
        priority: 'medium',
        category: 'Facturation',
        estimatedResponseTime: 24,
      },
      {
        code: 'ACCOUNT_CHANGE',
        name: 'Demande de modification de compte',
        description: 'Changement de paramètres de compte',
        priority: 'medium',
        category: 'Compte',
        estimatedResponseTime: 12,
      },
      {
        code: 'FEATURE_REQUEST',
        name: 'Demande de fonctionnalité',
        description: 'Suggestions de nouvelles fonctionnalités',
        priority: 'low',
        category: 'Produit',
        estimatedResponseTime: 72,
      },
      {
        code: 'COMPLAINT',
        name: 'Réclamation',
        description: 'Réclamation client',
        priority: 'critical',
        category: 'Support',
        estimatedResponseTime: 24,
      },
    ];

    await RequestType.insertMany(data);
    console.log('Seed done !');

    process.exit(0);
  } catch (error) {
    console.error('Seed error', error);
    process.exit(1);
  }
};

seed();
