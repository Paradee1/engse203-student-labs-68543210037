import { useState } from 'react';

function RequestForm({ onAddRequest }) {
  // 1. Controlled State กำหนดค่าเริ่มต้นเป็นสตริงว่างเสมอกัน undefined
  const [formData, setFormData] = useState({
    requesterName: '',
    requestType: '',
    location: '',
    details: '',
    priority: 'normal',
  });

  // 2. State สำหรับเก็บข้อความ Error
  const [errors, setErrors] = useState({});

  // 3. State สำหรับแสดง Status Feedback
  const [statusMessage, setStatusMessage] = useState('');

  // จัดการการเปลี่ยนแปลงค่าอินพุต
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }

  // ตรวจสอบความถูกต้องของข้อมูล (Validation Rules)
  function validateForm() {
    const newErrors = {};

    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'กรุณาระบุชื่อผู้แจ้ง';
    } else if (formData.requesterName.trim().length < 2) {
      newErrors.requesterName = 'ชื่อผู้แจ้งต้องมีความยาวอย่างน้อย 2 ตัวอักษร';
    }

    if (!formData.requestType) {
      newErrors.requestType = 'กรุณาเลือกประเภทคำร้อง';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'กรุณาระบุสถานที่';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'กรุณาระบุรายละเอียด';
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'รายละเอียดต้องมีความยาวอย่างน้อย 10 ตัวอักษร';
    }

    if (!['normal', 'urgent'].includes(formData.priority)) {
      newErrors.priority = 'กรุณาเลือกความเร่งด่วนที่ถูกต้อง';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage('');

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage('กรุณาตรวจสอบข้อมูลและแก้ไขข้อผิดพลาดในฟอร์ม');
      return;
    }

    // ส่งวัตถุ formData ที่มีข้อมูลจากอินพุตทั้งหมดไปยัง Parent
    onAddRequest({
      requesterName: formData.requesterName.trim(),
      requestType: formData.requestType,
      location: formData.location.trim(),
      details: formData.details.trim(),
      priority: formData.priority,
    });

    // Reset Form กลับเป็นค่าเริ่มต้น
    setFormData({
      requesterName: '',
      requestType: '',
      location: '',
      details: '',
      priority: 'normal',
    });
    setErrors({});
    setStatusMessage('เพิ่มคำร้องสำเร็จเรียบร้อยแล้ว');
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input
            id="requesterName"
            name="requesterName"
            type="text"
            value={formData.requesterName || ''}
            onChange={handleChange}
            aria-invalid={!!errors.requesterName}
            aria-describedby="requesterName-error"
          />
          <small className="error" id="requesterName-error">
            {errors.requesterName}
          </small>
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType || ''}
            onChange={handleChange}
            aria-invalid={!!errors.requestType}
            aria-describedby="requestType-error"
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
          </select>
          <small className="error" id="requestType-error">
            {errors.requestType}
          </small>
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location || ''}
            onChange={handleChange}
            aria-invalid={!!errors.location}
            aria-describedby="location-error"
          />
          <small className="error" id="location-error">
            {errors.location}
          </small>
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea
            id="details"
            name="details"
            rows="4"
            value={formData.details || ''}
            onChange={handleChange}
            aria-invalid={!!errors.details}
            aria-describedby="details-error"
          ></textarea>
          <small className="error" id="details-error">
            {errors.details}
          </small>
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={formData.priority === 'normal'}
              onChange={handleChange}
            />{' '}
            ปกติ
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="urgent"
              checked={formData.priority === 'urgent'}
              onChange={handleChange}
            />{' '}
            เร่งด่วน
          </label>
          <small className="error" id="priority-error">
            {errors.priority}
          </small>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        <p className="status" role="status">
          {statusMessage}
        </p>
      </form>
    </section>
  );
}

export default RequestForm;