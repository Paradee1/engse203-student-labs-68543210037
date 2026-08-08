# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล:  ภารดี อ่อนละออ
รหัสนักศึกษา:  68543210037-6

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   คำตอบ: App Component เพราะ App เป็นตัวเรียกใช้ useState สร้างและเก็บ tasks กับ statusFilter ไว้ที่ตัวเอง เพื่อนำไปคำนวณ summary กับ filteredTasks แล้วค่อยกระจายส่ง Props ลงไปให้ Component อื่นๆ ใช้งาน

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   คำตอบ: 
   Props (ส่งลง): <TaskCard task="{task}"/> (ส่งข้อมูลงานแต่ละตัวจาก TaskList ไป TaskCard)

   Callback Event (ส่งขึ้น): onDeleteTask(task.id) ใน TaskCard เมื่อกดปุ่มลบ จะยิง task.id ส่งกลับขึ้นไปหาฟังก์ชัน handleDeleteTask ใน App เพื่อสั่งลบข้อมูลออกจาก State

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   คำตอบ: 
   Data Contract: เปลี่ยนโครงสร้างข้อมูลจาก Task (งานเรียน) ไปใช้ Request Schema (ข้อมูลรายการคำร้อง)
   
   Validation: เพิ่มการตรวจเช็กช่องกรอกข้อมูลในฟอร์ม ถ้าเว้นว่างไว้ให้แสดงข้อความ Error และเปิดใช้ aria-invalid="true" เพื่อให้ช่อง Input ขึ้นขอบแดง
   
   Component Responsibility: ปรับบทบาทจากการจัดการ Task มาเป็นระบบรับเรื่องคำร้อง โดย App คอยเก็บ State สรุปยอดและกรองข้อมูล ส่วน Component ลูกคอยแสดงผลรายการคำร้องและยิง Callback Event กลับขึ้นมาอัปเดต State

