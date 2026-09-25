---

## การเปลี่ยนแปลงในเวอร์ชัน 2.0.0 (Week 10 - Database Integration)

### ประวัติการเปลี่ยนแปลง (Revision History)
* **v2.0.0** (Week 10): เปลี่ยนระบบจัดเก็บข้อมูลจากไฟล์ JSON เป็นฐานข้อมูลเชิงสัมพันธ์ SQLite (`campus.db`) ปรับปรุงการจัดการ Database Constraint Errors และเพิ่มการแปลงข้อมูลระหว่าง Database กับ API Payload
* **v1.0.0** (Week 06/07): รองรับ RESTful API ขั้นพื้นฐานและจำลองการเก็บข้อมูลในหน่วยความจำ/ไฟล์ JSON

---

## Endpoints

| Method | Endpoint | คำอธิบาย | Request body | สำเร็จ | ผิดพลาด |
|---|---|---|---|---|---|
| `GET` | `/api/requests` | ดูคำร้องทั้งหมด | — | `200` + array | — |
| `GET` | `/api/requests?status=` | กรองตามสถานะ | — | `200` + array | — |
| `GET` | `/api/requests/:id` | ดูคำร้องใบเดียว | — | `200` + object | `404` ไม่พบ |
| `POST` | `/api/requests` | สร้างคำร้องใหม่ | Request (ไม่ต้องมี `id`, `status`) | `201` + object ที่สร้าง | `400` ข้อมูลไม่ถูกต้อง |
| `PUT` | `/api/requests/:id` | เปลี่ยนสถานะ | `{ "status": "..." }` | `200` + object ที่แก้แล้ว | `400` สถานะผิด · `404` ไม่พบ |
| `DELETE` | `/api/requests/:id` | ลบคำร้อง | — | `204` ไม่มี body | `404` ไม่พบ |

### รายละเอียดแต่ละ Endpoint

#### 1. GET /api/requests
ดึงรายการคำร้องทั้งหมดในระบบ คืนค่าเป็น Array

#### 2. GET /api/requests/:id
ดึงข้อมูลคำร้องตามรหัสคำร้อง คืนค่าเป็น Object หากไม่พบจะตอบ 404

#### 3. POST /api/requests
สร้างคำร้องขอรับบริการใหม่ คืนค่า 201 Created

#### 4. PUT /api/requests/:id
อัปเดตสถานะของคำร้อง (status) คืนค่า 200 OK

#### 5. DELETE /api/requests/:id
ลบคำร้องออกจากระบบ คืนค่า 204 No Content

### ① Data Model (แบบจำลองฐานข้อมูล)

ระบบใช้ฐานข้อมูล SQLite ประกอบด้วย 2 ตารางที่มีความสัมพันธ์กัน:

#### 1. ตาราง `users` (ข้อมูลผู้ใช้งาน)
| คอลัมน์ | ชนิดข้อมูล | ข้อกำหนด (Constraints) | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | รหัสประจำตัวผู้ใช้ |
| `name` | TEXT | NOT NULL | ชื่อ-นามสกุลของผู้ใช้ |
| `department` | TEXT | NOT NULL DEFAULT 'ไม่ระบุ' | แผนก/หน่วยงาน |
| `email` | TEXT | NOT NULL UNIQUE | อีเมลผู้ใช้งาน |

#### 2. ตาราง `requests` (ข้อมูลคำร้องขอรับบริการ)
| คอลัมน์ | ชนิดข้อมูล | ข้อกำหนด (Constraints) | คำอธิบาย |
| :--- | :--- | :--- | :--- |
| `id` | TEXT | PRIMARY KEY | รหัสคำร้อง เช่น `REQ-001` |
| `requester_id` | INTEGER | NOT NULL, REFERENCES users(id) | รหัสผู้แจ้ง (เชื่อมโยงไปยัง `users.id`) |
| `request_type` | TEXT | NOT NULL, CHECK (request_type IN ('แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ')) | ประเภทของคำร้อง |
| `location` | TEXT | NOT NULL | สถานที่เกิดเหตุ/ต้องการบริการ |
| `details` | TEXT | NOT NULL | รายละเอียดคำร้อง |
| `priority` | TEXT | NOT NULL DEFAULT 'normal', CHECK (priority IN ('normal', 'urgent')) | ระดับความเร่งด่วน |
| `status` | TEXT | NOT NULL DEFAULT 'pending', CHECK (status IN ('pending', 'in-progress', 'completed')) | สถานะการดำเนินงาน |
| `created_at` | TEXT | NOT NULL DEFAULT CURRENT_TIMESTAMP | วันที่และเวลาที่บันทึกข้อมูล |

---

### ② ข้อสังเกตเรื่องรูปแบบ (Schema vs. API Payload Mapping)

โครงสร้างที่จัดเก็บจริงในฐานข้อมูลไม่เหมือนกับรูปแบบ JSON ที่ API ตอบกลับไปยัง Client:

* **Normalization ในฐานข้อมูล:** ตาราง `requests` จัดเก็บเพียง `requester_id` (INTEGER Foreign Key) เพื่อตัดความซ้ำซ้อนของข้อมูลผู้ใช้งาน (ตามหลัก 3NF)
* **Frontend-Friendly ใน API:** Frontend ต้องการฟิลด์ `requesterName` (TEXT) ไปแสดงผลบนหน้าจอโดยตรง เพื่อลดภาระการยิง API ซ้ำซ้อน
* **บทบาทของ Service Layer:** ฟังก์ชันใน `requestService.js` ทำหน้าที่เป็น Adapter ด้วยการใช้คำสั่ง `JOIN users u ON r.requester_id = u.id` พร้อมกำหนด `u.name AS requesterName` ในฝั่ง Query เพื่อรักษา API Contract เดิมไว้โดยไม่ต้องแก้ไข Frontend

---

### ③ พฤติกรรมสำคัญของ `POST /api/requests` (Auto User Resolution)

* **การสร้างผู้ใช้อัตโนมัติ (Auto Provisioning):** เมื่อมีการส่งคำร้องใหม่ผ่าน `POST /api/requests` และระบุ `requesterName` เข้ามา ฟังก์ชัน `resolveUserId()` จะทำการค้นหาชื่อดังกล่าวในตาราง `users` ก่อน:
  * หากพบชื่อในระบบ: จะใช้ `id` เดิมของผู้ใช้นั้นมาผูกกับ `requester_id`
  * หากไม่พบชื่อในระบบ: ระบบจะสร้างระเบียนผู้ใช้ใหม่ลงในตาราง `users` ให้อัตโนมัติทันที โดยสร้างอีเมลจำลอง (`user-<timestamp>@rmutl.ac.th`) และตั้งค่าแผนกเป็น `'ไม่ระบุ'`
* **ข้อควรระวัง:** การเรียกใช้ Endpoint นี้โดยส่งชื่อที่ไม่ตรงกันแม้เพียงเล็กน้อย (เช่น พิมพ์วรรคผิดหรือพิมพ์ตก) จะทำให้เกิด User ขยะขึ้นในระบบได้

# Data Model

## ฐานข้อมูล (Database Schema)

ระบบใช้งานฐานข้อมูล SQLite (`campus.db`) สำหรับจัดเก็บข้อมูล โดยมีโครงสร้างตารางดังนี้:

### ตาราง users
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `department` TEXT NOT NULL DEFAULT 'ไม่ระบุ'
- `email` TEXT NOT NULL UNIQUE

### ตาราง requests
- `id` TEXT PRIMARY KEY
- `requester_id` INTEGER NOT NULL REFERENCES users(id)
- `request_type` TEXT NOT NULL CHECK (request_type IN ('แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'))
- `location` TEXT NOT NULL
- `details` TEXT NOT NULL
- `priority` TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent'))
- `status` TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed'))
- `created_at` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP

---

## ข้อสังเกตเรื่องรูปแบบข้อมูล (Data Mapping)
- ในฐานข้อมูลเก็บ `requester_id` เพื่อลดความซ้ำซ้อนตามหลัก Normalization
- แต่ API ส่งออก `requesterName` โดยใช้การ JOIN เพื่อให้ Frontend ใช้งานได้ทันที

---

## พฤติกรรมของ POST (สร้าง User อัตโนมัติ)
- เมื่อส่งคำร้องใหม่ผ่าน `POST /api/requests` หากส่ง `requesterName` ที่ยังไม่มีในระบบ ระบบจะสร้าง user ใหม่ในตาราง `users` ให้อัตโนมัติ