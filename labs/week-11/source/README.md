# Campus Service — Full-Stack (Week 11 · starter)

> 🏠 TODO W11-README (CP40) — เขียน README นี้ใหม่ให้ครบ:
> สถาปัตยกรรม 3 ชั้น · วิธีรัน dev/production · env vars · การตัดสินใจออกแบบ

ระบบตั้งต้นจากสัปดาห์ที่ 10 (React + Express + SQLite)
งานสัปดาห์นี้: ทำให้ **พร้อมใช้จริง** — config, health check, error handling, build, deploy

---

# Campus Service Request System (Full-Stack Production Ready)

ระบบจัดการคำร้องการบริการภายในสถานศึกษา พัฒนาแบบ Full-Stack ด้วยสถาปัตยกรรมแบบแยกชั้น (Layered Architecture) รองรับการรันทั้งโหมดพัฒนา (Development) และโหมดใช้งานจริง (Production) รวมพอร์ตเดียว

---

## สถาปัตยกรรม 3 ชั้น

┌─────────┐  HTTP   ┌──────────┐  SQL   ┌─────────┐
│ React   │ ──────► │ Express  │ ─────► │ SQLite  │
└─────────┘  JSON   └──────────┘  rows  └─────────┘

| ชั้น (Layer) | หน้าที่และความรับผิดชอบ | ไดเรกทอรี |
|---|---|---|
| **Frontend** | จัดการ State, หน้าจอ UI, รับข้อมูลฟอร์ม และเรียก API ผ่าน Service Client | `frontend/` |
| **API** | กำหนด REST Routing, ตรวจสอบ Payload (Controller), ประมวลผล Business Logic (Service) และตรวจสุขภาพระบบ (Health Check) | `api/src/` |
| **Database** | จัดเก็บข้อมูลแบบสัมพันธ์ (Relational Data) ด้วยคำสั่ง SQL DDL/DML | `api/data/` |

---

## การตัดสินใจเชิงสถาปัตยกรรม (Design Decisions)

1. **การแยก 3 ชั้น (3-Layer Architecture):**
   * เพื่อลดการผูกมัดโค้ด (Decoupling) การแก้ไข Logic ของฐานข้อมูลหรือการเปลี่ยน Driver ทำได้เฉพาะใน `service` โดยไม่ต้องแตะต้อง `controller` หรือ `frontend`
2. **การเลือกใช้ SQLite (Embedded Database):**
   * เหมาะกับระบบขนาดเล็กถึงปานกลาง ไม่ต้องตั้งค่าเซิร์ฟเวอร์ฐานข้อมูลแยก
   * ข้อมูลมีโครงสร้างชัดเจน (Schema) มีความสัมพันธ์ระหว่างรายการและสถานะคำร้อง

---

## ตัวแปรสภาพแวดล้อม (Environment Variables)

### API (`api/.env`)
| ตัวแปร | ค่าเริ่มต้น | หน้าที่ |
|---|---|---|
| `PORT` | `3001` | พอร์ตที่ Express API เปิดรับคำขอ |
| `NODE_ENV` | `development` | โหมดการทำงาน (`development` แสดง Stack Trace / `production` ซ่อน Error Stack และเสิร์ฟ Static Files) |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed Origin ในโหมด Development |

### Frontend (`frontend/.env.development` และ `.env.production`)
| ตัวแปร | โหมด Development | โหมด Production | หน้าที่ |
|---|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3001` | `""` (Empty String) | พาธเริ่มต้นของ API (Production ยิงแบบ Relative Path พอร์ตเดียวกัน) |

---

## ขั้นตอนการติดตั้งและรันระบบ

### 1. โหมด Development (แยก 2 Terminal)
* **Terminal 1 (Backend API):**
  ```bash
  cd api && npm run dev

* **Terminal 2 (Frontend):**
  โหมด Production (รันรวมพอร์ตเดียว)
  cd frontend && npm run dev

### โหมด Production (รันรวมพอร์ตเดียว)
* **รันคำสั่งจาก Root ของสัปดาห์ (labs/week-11/source/):**
    ```bash
    # 1. ติดตั้งและบิลด์ Assets
    NODE_ENV=production npm run build

    # 2. เริ่มต้นรันเซิร์ฟเวอร์ Express ที่เสิร์ฟทั้ง API และหน้าเว็บ
    NODE_ENV=production PORT=10000 npm start

เปิดใช้งานผ่านเบราว์เซอร์ที่: http://localhost:10000/


