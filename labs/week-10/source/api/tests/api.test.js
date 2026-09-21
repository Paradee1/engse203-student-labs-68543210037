import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => { 
  await loadSeed(); 
  app = createApp(); 
});

describe('Campus Requests API Tests (CP33)', () => {
  // เคสที่ 1: GET /api/requests → 200 และได้ array
  test('1. GET /api/requests คืน status 200 พร้อม array ข้อมูล', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body), true);
  });

  // เคสที่ 2: คืน requesterName ไม่ใช่ requester_id
  test('2. ข้อมูลคำร้องต้องมี requesterName และไม่มี requester_id', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(res.body.length > 0, 'ควรมีข้อมูลอย่างน้อย 1 รายการ');

    const first = res.body[0];
    assert.ok('requesterName' in first, 'ต้องมีฟิลด์ requesterName');
    assert.equal('requester_id' in first, false, 'ต้องไม่มีฟิลด์ requester_id');
  });

  // เคสที่ 3: GET /:id พบ → 200 · ไม่พบ → 404
  test('3. GET /:id พบ → 200 และไม่พบ → 404', async () => {
    const resFound = await request(app).get('/api/requests/REQ-001');
    assert.equal(resFound.status, 200);
    assert.equal(resFound.body.id, 'REQ-001');

    const resNotFound = await request(app).get('/api/requests/REQ-999');
    assert.equal(resNotFound.status, 404);
  });

  // เคสที่ 4: POST ถูกต้อง → 201
  test('4. POST ข้อมูลครบถ้วน → สร้างสำเร็จได้ status 201', async () => {
    const payload = {
      requesterName: 'สมชาย ใจดี',
      requestType: 'แจ้งซ่อม',
      location: 'ห้อง 301',
      details: 'เครื่องปรับอากาศมีน้ำหยด',
      priority: 'normal'
    };

    const res = await request(app).post('/api/requests').send(payload);
    assert.equal(res.status, 201);
    assert.ok(res.body.id, 'ต้องมี id ของคำร้องที่ถูกสร้าง');
    assert.equal(res.body.requesterName, 'สมชาย ใจดี');
  });

  // เคสที่ 5: POST ไม่ครบ → 400
  test('5. POST ข้อมูลไม่ครบถ้วน → ได้ status 400', async () => {
    const invalidPayload = {
      details: 'ส่งเฉพาะ details ขาดฟิลด์บังคับอื่น'
    };

    const res = await request(app).post('/api/requests').send(invalidPayload);
    assert.equal(res.status, 400);
  });

  // เคสที่ 6: ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
  test("6. ยิง SQL Injection ผ่าน ?status=x' OR '1'='1 แล้วต้องไม่หลุดข้อมูลทั้งหมด", async () => {
    const payload = "x' OR '1'='1";
    const res = await request(app).get(`/api/requests?status=${encodeURIComponent(payload)}`);
    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body), true);
    // เมื่อใช้ parameterized query (?) จะมอง payload เป็นสตริงปกติ ซึ่งไม่มี status นี้ จึงต้องได้ array ว่าง
    assert.equal(res.body.length, 0);
  });
});