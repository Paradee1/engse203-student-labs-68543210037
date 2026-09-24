## ผลการทดสอบ Constraint

### ① Foreign Key

**คำสั่งที่ลอง**

​```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-TEST', 99999, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบระบบ');
​```

**ผลที่ได้** `FOREIGN KEY constraint failed` ✓ ถูกปฏิเสธตามที่ควร

### ② CHECK Constraint

**คำสั่งที่ลอง**

​```sql
UPDATE requests SET status = 'ยกเลิก' WHERE id = 'REQ-001';
​```

**ผลที่ได้** `Error: CHECK constraint failed: status IN ('pending','in-progress','completed')` ✓ ถูกปฏิเสธตามที่ควร

### ③ UNIQUE Constraint (อีเมลซ้ำ)

**คำสั่งที่ลอง**

​```sql
INSERT INTO users (name, department, email)
VALUES ('สมชาย ซ้ำ', 'วิศวกรรมไฟฟ้า', 'somchai@rmutl.ac.th');
​```

**ผลที่ได้** `Error: UNIQUE constraint failed: users.email` ✓ ถูกปฏิเสธตามที่ควร

### ④ PRIMARY KEY Constraint (รหัสคำร้องซ้ำ)

**คำสั่งที่ลอง**

​```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-001', 1, 'แจ้งซ่อม', 'ห้อง 101', 'รหัสซ้ำ');
​```

**ผลที่ได้** `Error: UNIQUE constraint failed: requests.id` ✓ ถูกปฏิเสธตามที่ควร

### ⑤ NOT NULL Constraint

**คำสั่งที่ลอง**

​```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-TEST5', 1, 'แจ้งซ่อม', NULL, 'ไม่มีสถานที่');
​```

**ผลที่ได้** `Error: NOT NULL constraint failed: requests.location` ✓ ถูกปฏิเสธตามที่ควร