# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Gemini | อธิบายข้อผิดพลาดของ Syntax Error ใน `requestStorage.js`, การแก้บั๊ก Template Literal ใน `createRequestId`, และเปรียบเทียบแนวทางกักบริเวณ `fetch`/`localStorage` ให้อยู่ใน Service/Storage Layer | โครงสร้างฟังก์ชัน `readStoredRequests`, `writeStoredRequests`, `loadNormalRequests` และการจัดการ State ใน `RequestDetailPage.jsx` | รัน `npm run check` (ผ่าน 136/136 รายการ), รัน `npm run build` และทดสอบพฤติกรรมจริงบนเบราว์เซอร์ผ่าน DevTools | นำคำอธิบายมาปรับแก้โค้ดด้วยตนเองตามโจทย์ ตรวจสอบความสอดคล้องกับ Contract ของ LAB และทำความเข้าใจเหตุผลของโค้ดทุกบรรทัดเพื่อตอบคำถามปากเปล่า |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
