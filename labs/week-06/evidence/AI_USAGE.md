# ENGSE203 LAB06 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Gemini | เอาโค้ด error จากที่รัน `npm run check` ไปถาม ให้ช่วยชี้จุดที่ผิดและแนะนำวิธีแก้ไข | แนวทางการเติม `async/await` ใน controller, โค้ดตัวอย่างของฟังก์ชัน `updateStatus` และตัวอย่างการเขียนแยก middleware สำหรับ validate | รัน `npm run check` จนผ่านครบ 28/28 รายการ และลองทดสอบยิง API ผ่าน Postman เพื่อดูผลตอบกลับจริง | นำจุดที่แนะนำมาไล่เช็คและพิมพ์แก้โค้ดด้วยตัวเอง |

คำรับรอง:

- [x] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [x] ตรวจ source และรัน test ด้วยตนเอง
- [x] อธิบาย 3-Layer Architecture, Middleware, Error Handling และ Data Persistence ของ final code ได้