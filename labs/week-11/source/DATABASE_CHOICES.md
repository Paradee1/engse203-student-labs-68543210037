# การวิเคราะห์ทางเลือกฐานข้อมูล (Database Choices Reflection)

**ผู้จัดทำ:** นางสาว ภารดี อ่อนละออ  
**รหัสนักศึกษา:** 68543210037-6  

---

### 1. ทำไมโปรเจกต์นี้จึงเลือก SQLite แทน MongoDB?

โปรเจกต์ Campus Service มีโครงสร้างข้อมูลคำร้องที่ชัดเจนและแน่นอน (Structured Data) มีฟิลด์ที่กำหนดเงื่อนไขเฉพาะ เช่น `id`, `title`, `status`, และ `created_at` ซึ่งการใช้ Relational Database ที่มี Data Types และ Constraints กำกับช่วยป้องกันข้อผิดพลาดของข้อมูลได้ดีกว่า Document-based นอกจากนี้ ข้อมูลมีความสัมพันธ์และต้องการการสืบค้นแบบเฉพาะเจาะจง การใช้ SQLite ทำให้สามารถจัดเก็บเป็นไฟล์เดียวร่วมกับโปรเจกต์ได้โดยตรง ประหยัดทรัพยากร และไม่ต้องจัดการ Server Process แยกเหมือน MongoDB

### 2. หากในอนาคตจำเป็นต้องเปลี่ยนไปใช้ MongoDB จะส่งผลกระทบต่อชั้นใดบ้าง?

การเปลี่ยนไปใช้ MongoDB จะส่งผลกระทบต่อทั้ง **Service Layer** และ **Controller Layer**
* **Service Layer:** ต้องแก้คำสั่ง SQL เดิมทั้งหมด (`prepare()`, `.run()`, `.all()`) ให้กลายเป็นคำสั่งของ Mongoose หรือ MongoDB Driver (`find()`, `insertOne()`, `updateOne()`)
* **Controller Layer (จุดสำคัญ):** เนื่องจาก Driver ของ MongoDB ทำงานแบบ Asynchronous (คืนค่าเป็น Promise เสมอ) ฟังก์ชันใน Controller ที่เคยเรียกใช้ฟังก์ชันใน Service แบบ Synchronous จะต้องถูกเปลี่ยนเป็น `async/await` ทั้งหมดเพื่อให้รอรับผลลัพธ์จาก Service ได้ถูกต้อง

### 3. Asynchronous Database Operations จำเป็นเมื่อใด และไม่จำเป็นเมื่อใด?

* **ไม่จำเป็น (Synchronous เพียงพอ):** เมื่อฐานข้อมูลทำงานแบบ Embedded ทำงานอยู่ใน Process หรือ Memory เดียวกันกับแอปพลิเคชัน และอ่านเขียนไฟล์ใน Local Disk เครื่องเดียวกัน (เช่น `node:sqlite` หรือ SQLite ทั่วไป) ซึ่งมี Latency ต่ำมากและไม่ผ่าน Network
* **จำเป็น (Asynchronous Required):** เมื่อฐานข้อมูลแยกไปอยู่นอก Process หรือตั้งอยู่คนละเครื่องเซิร์ฟเวอร์ (เช่น MongoDB Atlas, PostgreSQL หรือ Turso ผ่าน Cloud) การส่งคำสั่งและการรอผลลัพธ์ต้องผ่าน Network I/O ซึ่งใช้เวลา หากทำงานแบบ Synchronous จะทำให้ Node.js Event Loop หยุดชะงัก (Block) และไม่สามารถรับ Request อื่นได้ จึงจำเป็นต้องใช้ Asynchronous (`Promise` / `async-await`)