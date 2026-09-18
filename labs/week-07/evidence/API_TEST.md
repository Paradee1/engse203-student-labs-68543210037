# บันทึกผลการทดสอบ API (Automated Test Report) — Lab 07

**ผู้จัดทำ:** นางสาว ภารดี อ่อนละออ  
**รหัสนักศึกษา:** 68543210037-6  
**วันที่ทดสอบ:** 18 กันยายน 2569  

---

## 1. ภาพรวมการทดสอบ

การทดสอบฝั่ง Backend API ใช้ชุดเครื่องมือ Node.js Native Test Runner (`node:test`, `node:assert/strict`) ร่วมกับ `supertest` เพื่อจำลองการส่ง HTTP Request ไปยัง Express App โดยตรงโดยไม่ต้องสตาร์ตเซิร์ฟเวอร์แยก

* **ไฟล์ทดสอบ:** `api/tests/api.test.js`
* **คำสั่งที่ใช้รัน:** `npm test` (รันจากโฟลเดอร์ `api/`)
* **ผลลัพธ์โดยรวม:** ผ่านครบทั้ง 6 เคส (Pass 6 / Fail 0)

---

## 2. ตารางสรุปผลการทดสอบทั้ง 6 เคส (CP16)

| ลำดับ | สิ่งที่ทดสอบ (Test Case) | HTTP Method & Path | สิ่งที่คาดหวัง (Expected) | ผลลัพธ์จริง (Actual) | สถานะ |
|:---:|---|---|---|---|:---:|
| 1 | ดึงรายการคำร้องทั้งหมด | `GET /api/requests` | Status 200 และคืน Array | Status 200, Body เป็น Array รายการคำร้อง | PASS |
| 2 | ดึงข้อมูลคำร้องที่มีอยู่ในระบบ | `GET /api/requests/REQ-001` | Status 200 พร้อมข้อมูลที่ตรงกัน | Status 200, `id: "REQ-001"` | PASS |
| 3 | ดึงข้อมูลคำร้องที่ไม่มีในระบบ | `GET /api/requests/REQ-999` | Status 404 พร้อม JSON error | Status 404, มีฟิลด์ `error` | PASS |
| 4 | สร้างคำร้องใหม่ด้วยข้อมูลถูกต้อง | `POST /api/requests` | Status 201 และสถานะเริ่มต้น `pending` | Status 201, คืน `id` ใหม่ และ `status: "pending"` | PASS |
| 5 | ส่งข้อมูลสร้างคำร้องไม่ครบถ้วน | `POST /api/requests` | Status 400 Bad Request | Status 400, ตอบกลับ JSON แจ้ง error | PASS |
| 6 | ตรวจสอบการอนุญาต CORS | `GET /api/requests` (ส่ง Origin) | Response Header มี Origin ที่ถูกต้อง | Header `access-control-allow-origin` ตรงกับ `CORS_ORIGIN` | PASS |

---

## 3. ผลลัพธ์จาก Terminal (`npm test`)

```text
> engse203-week06-campus-api@2.0.0 test
> node --test "tests/*.test.js"

GET /api/requests 200 2.610 ms - 1030
▶ Campus Service API Automated Tests
  ✔ GET /api/requests คืนรายการทั้งหมด พร้อม status 200 และผลลัพธ์เป็น Array (20.360599ms)
GET /api/requests/REQ-001 200 0.600 ms - 321
  ✔ GET /api/requests/:id รายการที่มีอยู่ ตอบ status 200 พร้อมข้อมูลคำร้อง (4.904249ms)
GET /api/requests/REQ-999 404 0.395 ms - 65
  ✔ GET /api/requests/:id รหัสที่ไม่มีในระบบ ตอบ 404 Not Found (3.642925ms)
POST /api/requests 201 10.458 ms - 343
  ✔ POST /api/requests ข้อมูลถูกต้อง ตอบ 201 Created และตั้ง status เป็น pending (16.145999ms)
POST /api/requests 400 0.635 ms - 514
  ✔ POST /api/requests ข้อมูลไม่ครบ ตอบ 400 Bad Request พร้อมข้อความ error (5.62575ms)
GET /api/requests 200 0.362 ms - 1374
  ✔ CORS Header ตอบกลับ Access-Control-Allow-Origin ตรงกับ origin ที่อนุญาต (6.004266ms)
✔ Campus Service API Automated Tests (63.462856ms)
ℹ tests 6
ℹ suites 1
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 278.710019