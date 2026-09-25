# AI Usage Disclosure (Week 10)

## 1. วัตถุประสงค์ในการปรึกษา AI
- สอบถามแนวทางการเปลี่ยน Service จากการอ่าน JSON มาใช้ `node:sqlite` (`DatabaseSync`)
- ปรึกษาวิธีการเขียน Parameterized Query เพื่อป้องกันช่องโหว่ SQL Injection (CP31)
- ออกแบบฟังก์ชัน `toAppError()` เพื่อแปลง SQLite Constraint Error เป็น HTTP 4xx (CP32)
- ออกแบบ Test Cases 6 เคสใน `api.test.js` ที่ทดสอบ Database Integration แบบ Idempotent (CP33)
- ขอคำแนะนำการสร้าง Transaction (`BEGIN`, `COMMIT`, `ROLLBACK`) และ Index Benchmark ในส่วน Challenge

## 2. เครื่องมือที่ใช้
- Google Gemini

## 3. สิ่งที่นำมาปรับใช้และแก้ไขเอง
- ตรวจสอบไวยากรณ์ SQL ร่วมกับ Schema จากสัปดาห์ที่ 9 ให้ตรงกับคอลัมน์จริง
- แก้ไขปัญหาลำดับ Middleware ใน `app.js` โดยย้าย Route ของ User ขึ้นมาก่อน `notFound`
- จัดการโครงสร้างไฟล์ `API_CONTRACT.md` และรายงานผลการทดสอบ `SECURITY_TEST.md`
- ปรับจูนการลบข้อมูลทดสอบในบล็อก `after()` ของ Test Suite เพื่อไม่ให้มีข้อมูลค้างใน `campus.db`
