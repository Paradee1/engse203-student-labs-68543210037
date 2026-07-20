# ENGSE203 LAB 02 — Learning Dashboard

## 👤 ข้อมูลผู้จัดทำ (Student Information)
* **ชื่อ-นามสกุล:** นางสาว ภารดี อ่อนละออ (ชมพู่)
* **รหัสนักศึกษา:** 68543210037-6

ระบบแดชบอร์ดแสดงผลข้อมูลรายการบทเรียน (Learning Tasks) แบบ Asynchronous สำหรับรายวิชา ENGSE203 พัฒนาด้วย Modern JavaScript (ES Modules), Vite, และจัดทำระบบคัดกรอง ค้นหา พร้อมประมวลผลสถิติสรุปบทเรียน รองรับการแสดงผลสถานะ UI และการจัดการข้อผิดพลาด (Error Handling) 

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (How to Run)

1. **คัดลอกรีโพซิทอรีลงเครื่องคอมพิวเตอร์ของคุณ (Clone Repository):**
   ```bash
   git clone [https://github.com/Paradee1/engse203-lab02-68543210037-6.git](https://github.com/Paradee1/engse203-lab02-68543210037-6.git)

2. เข้าสู่โฟลเดอร์โปรเจกต์:
cd engse203-lab02-68543210037-6

3. ติดตั้ง Dependencies ทั้งหมดผ่าน npm:
npm install

4. เปิดใช้งานโปรเจกต์บนเครื่องเซิร์ฟเวอร์จำลอง (Development Mode):
npm run dev
เปิดเว็บเบราว์เซอร์ไปที่ลิงก์ท้องถิ่น เช่น http://localhost:5173 เพื่อทดสอบการทำงาน

การทดสอบความถูกต้องและการ Build ไฟล์ Production:

Bash
## ตรวจสอบโครงสร้างและความถูกต้องของ Syntax
npm run check

## คอมไพล์งานเพื่อเตรียมขึ้น GitHub Pages (ไฟล์ผลลัพธ์จะอยู่ในโฟลเดอร์ /docs)
npm run build

1. สถานะการทำงานปกติ (Normal View)
แดชบอร์ดโหลดข้อมูลสำเร็จ แสดงแถบสถิติครบถ้วน และระบบค้นหา/คัดกรองทำงานได้อย่างถูกต้อง
![Normal State](./docs/screenshots/normal-view.png)

2. สถานะเมื่อเกิดข้อผิดพลาด (Error State จาก ?simulateError=1)
การแสดงผลหน้าจออินเทอร์เฟซเมื่อเกิดข้อผิดพลาดขึ้น (Error State) จากการจำลองเหตุการณ์ผ่าน Query Parameter เพื่อแจ้งเตือนผู้ใช้งานอย่างโปร่งใส
![Error State](./docs/screenshots/error-view.png)

## 📚 References & AI Assistance
## ข้อมูลการอ้างอิงเทคนิคทางซอฟต์แวร์ (References)
### - MDN Web Docs:

- การใช้งาน Fetch API เพื่อเชื่อมต่อข้อมูล Asynchronous ดึงไฟล์ JSON

- การจัดการสถานะและการทำงานแบบ Async/Await ร่วมกับ Try/Catch/Finally

- ฟังก์ชันควบคุมโครงสร้างอาเรย์พื้นฐานระดับสูง เช่น Array.prototype.filter(), Array.prototype.reduce(), และ Array.prototype.map()

### - Vite Documentation: การตั้งค่าและจัดการโครงสร้าง Base URL และกำหนดตำแหน่งเอาต์พุตไปยังโฟลเดอร์ docs/ เพื่อทำงานร่วมกับระบบเซิร์ฟเวอร์จำลองบน GitHub Pages

การใช้งานปัญญาประดิษฐ์ในการทำงาน (AI Assistance Disclosure)
Gemini AI:

ใช้ปรึกษาและออกแบบสถาปัตยกรรมแบ่งแยกส่วนโมดูลเพื่อให้ตรงหลัก Single Responsibility ประกอบไปด้วย api.js, utils.js, ui.js, และ main.js

ใช้ในการช่วยแนะนำไกด์ไลน์แก้ปัญหา Git Branch Management บนระบบปฏิบัติการ Ubuntu (WSL2) และแก้ไขปัญหาคำสั่ง vite: not found โดยการใช้ npm install

ใช้ตรวจสอบโค้ดและเปรียบเทียบความเรียบร้อยให้ครบถ้วนตามใบเกณฑ์ประเมินหัวข้อ JavaScript Foundations (7.1) และ Checklist การส่งงาน (7.2)