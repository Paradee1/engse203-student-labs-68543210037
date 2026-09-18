import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';
import { config } from '../src/config.js';

let app;

before(async () => {
  await loadSeed();
  app = createApp();
});

describe('Campus Service API Automated Tests', () => {
  // เคส 1: GET /api/requests
  test('GET /api/requests คืนรายการทั้งหมด พร้อม status 200 และผลลัพธ์เป็น Array', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });

  // เคส 2: GET /api/requests/:id ที่มีอยู่
  test('GET /api/requests/:id รายการที่มีอยู่ ตอบ status 200 พร้อมข้อมูลคำร้อง', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });

  // เคส 3: GET /api/requests/:id ที่ไม่มี
  test('GET /api/requests/:id รหัสที่ไม่มีในระบบ ตอบ 404 Not Found', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
    assert.ok(res.body.error);
  });

  // เคส 4: POST ข้อมูลถูกต้อง
  test('POST /api/requests ข้อมูลถูกต้อง ตอบ 201 Created และตั้ง status เป็น pending', async () => {
    const validData = {
      requesterName: 'ทดสอบ ผู้แจ้ง',
      requestType: 'แจ้งซ่อม',
      location: 'ห้องปฏิบัติการ 301',
      details: 'เครื่องปรับอากาศมีเสียงดังและไม่เย็น',
      priority: 'normal',
    };

    const res = await request(app)
      .post('/api/requests')
      .send(validData);

    assert.equal(res.status, 201);
    assert.ok(res.body.id);
    assert.equal(res.body.status, 'pending');
    assert.equal(res.body.requesterName, validData.requesterName);
  });

  // เคส 5: POST ข้อมูลไม่ครบ
  test('POST /api/requests ข้อมูลไม่ครบ ตอบ 400 Bad Request พร้อมข้อความ error', async () => {
    const invalidData = {
      requesterName: 'ก', // สั้นเกินไปและฟิลด์อื่นไม่ครบ
    };

    const res = await request(app)
      .post('/api/requests')
      .send(invalidData);

    assert.equal(res.status, 400);
    assert.ok(res.body.error);
  });

  // เคส 6: CORS header ตอบ origin ที่อนุญาต
  test('CORS Header ตอบกลับ Access-Control-Allow-Origin ตรงกับ origin ที่อนุญาต', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Origin', config.corsOrigin);

    assert.equal(res.headers['access-control-allow-origin'], config.corsOrigin);
  });
});