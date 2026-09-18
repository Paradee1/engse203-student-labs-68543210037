# บันทึกการใช้งานปัญญาประดิษฐ์ (AI Usage Report) — Lab 07

---

## 1. ภาพรวมการใช้งาน AI

ในปฏิบัติการ Lab 07 มีการใช้งาน AI (Gemini) เพื่อเป็นผู้ช่วยในการวิเคราะห์ข้อผิดพลาดของสคริปต์ตรวจงาน (Checker Script), ออกแบบเคสทดสอบอัตโนมัติ (Automated Tests), จัดโครงสร้างเอกสารสัญญาเชื่อมต่อระบบ (API Contract) รวมถึงแนวทางการแก้โจทย์ท้าทายพิเศษ (Challenge)

---

## 2. รายละเอียดการสอบถามและการนำไปปรับใช้

| ลำดับ | หัวข้อที่สอบถาม | สิ่งที่ถาม AI | ส่วนของคำตอบที่นำมาใช้ | สิ่งที่ปรับแก้/เขียนเองเพิ่มเติม |
|:---:|---|---|---|---|
| 1 | **Automated Test (CP16)** | วิธีเขียน Unit/Integration Test ด้วย `node:test` และ `supertest` ให้ครอบคลุม 6 เคส | โครงสร้างคำสั่งเทสต์ของทั้ง 6 เคส และ Assertions ตรวจสอบ status / body | ปรับข้อมูลจำลองในเคส `POST` ให้สอดคล้องกับ Schema และจำลองเงื่อนไข Mutation Test |
| 2 | **Challenge Features** | วิธีการสร้าง `AppError`, `asyncHandler` และระบบ Retry หน้าบ้าน | รูปแบบ Class `AppError` และฟังก์ชัน `asyncHandler` | นำโค้ดมาวางใน `errorHandler.js` เพื่อให้ตรงกับเงื่อนไขของ Checker และปรับพารามิเตอร์ `next` ใน Controller |
| 3 | **การแก้ปัญหา Checker** | วิเคราะห์สาเหตุ `Cannot find package 'supertest'` และ `[TODO]` ของ `API_CONTRACT.md` | คำสั่งติดตั้ง package ขาด และคำสั่งย้ายไฟล์ `API_CONTRACT.md` | รันคำสั่งย้ายพาธไฟล์ใน WSL และตรวจสอบโครงสร้างโฟลเดอร์ `source/` |
| 4 | **API Contract (CP15)** | ขอโครงสร้างเอกสาร `API_CONTRACT.md` ที่สมบูรณ์ตามเกณฑ์ | ตารางสรุป Endpoint และสเปกข้อมูลคำร้อง | ตรวจสอบตัวอย่าง JSON Request/Response จริงจากการยิงผ่าน Postman/Curl และลบช่องว่าง placeholder |

---

## 3. การทำความเข้าใจโค้ด (Code Understanding & Reflection)

* **ความเข้าใจในส่วน Error Handling:**  
  เข้าใจลำดับการทำงานของ Express Middleware ว่า `errorHandler` ต้องมี 4 พารามิเตอร์ `(err, req, res, next)` เสมอ Express ถึงจะมองว่าเป็นตัวจับ Error และเมื่อใช้ `AppError` ที่สืบทอดมาจาก `Error` จะช่วยให้กำหนดค่า `status` ติดไปกับตัว Error ได้ ทำให้โค้ดฝั่ง Controller ลดความซ้ำซ้อน
* **ความเข้าใจในส่วน Automated Test:**  
  เข้าใจว่า `supertest` จำลองการยิง HTTP ผ่าน Express App Object โดยไม่ต้องเปิดพอร์ตเซิร์ฟเวอร์จริง ทำให้รันเทสต์ได้เร็วและไม่ชนพอร์ตชน process อื่น
* **ความพร้อมในการอธิบาย:**  
  สามารถอธิบายที่มาของฟังก์ชันทุกบรรทัด โครงสร้างการเชื่อมโยง CORS และการตอบกลับของแต่ละ Status Code ต่อผู้สอนได้ทุกจุด