const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const RequestType = require('../src/models/RequestType');

beforeAll(async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-api-test';
  await mongoose.connect(uri);
});

beforeEach(async () => {
  await RequestType.deleteMany({});

  await RequestType.create({
    code: 'TEST_CODE',
    name: 'Test name',
    description: 'Test description',
    priority: 'medium',
    category: 'Test',
    estimatedResponseTime: 10
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/request-types', () => {
  it('should return an array of request types', async () => {
    const res = await request(app).get('/api/request-types');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});

describe('POST /api/request-types', () => {
  it('should create a new request type', async () => {
    const res = await request(app).post('/api/request-types').send({
      code: 'NEW_CODE',
      name: 'New type',
      description: 'Description',
      priority: 'high',
      category: 'Category',
      estimatedResponseTime: 5
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.code).toBe('NEW_CODE');
  });
});

describe('GET /api/request-types/:id', () => {
  it('should return a single request type by ID', async () => {
    const existing = await RequestType.findOne({ code: 'TEST_CODE' });

    const res = await request(app).get(`/api/request-types/${existing._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.code).toBe('TEST_CODE');
  });

  it('should return 404 for non-existing ID', async () => {
    const fakeId = '65a3c5bf1c4ae3b22ad12345';

    const res = await request(app).get(`/api/request-types/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Not found');
  });
});

describe('POST /api/request-types (error case)', () => {
  it('should return validation error when required fields are missing', async () => {
    const res = await request(app).post('/api/request-types').send({
      code: 'INVALID_TEST'
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Validation error');
  });
});
