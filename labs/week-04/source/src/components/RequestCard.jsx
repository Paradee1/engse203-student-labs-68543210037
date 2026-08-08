function RequestCard({ request, onDeleteRequest }) {
  // 1. กำหนดป้ายระดับความเร่งด่วน
  const isUrgent = request.priority === 'urgent';
  const priorityLabel = isUrgent ? 'เร่งด่วน' : 'ปกติ';
  const priorityClass = isUrgent ? 'badge badge-urgent' : 'badge badge-normal';

  // 2. กำหนดป้ายสถานะคำร้อง (pending / in-progress / completed)
  const statusConfig = {
    pending: { label: 'รอดำเนินการ', style: { backgroundColor: '#fef3c7', color: '#92400e' } },
    'in-progress': { label: 'กำลังดำเนินการ', style: { backgroundColor: '#e0f2fe', color: '#075985' } },
    completed: { label: 'เสร็จสิ้น', style: { backgroundColor: '#dcfce7', color: '#166534' } },
  };

  const currentStatus = statusConfig[request.status] || {
    label: request.status || 'รอดำเนินการ',
    style: { backgroundColor: '#fef3c7', color: '#92400e' },
  };

  return (
    <article className="request-card">
      <div>
        {/* แถบหัวการ์ด: รหัส + ป้ายความเร่งด่วน + ป้ายสถานะ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
          <span className="request-id">{request.id}</span>
          <span className={priorityClass}>{priorityLabel}</span>
          <span className="badge" style={currentStatus.style}>{currentStatus.label}</span>
        </div>

        {/* ประเภทคำร้อง */}
        <h3 style={{ margin: '0.2rem 0 0.4rem 0' }}>{request.requestType}</h3>

        {/* รายละเอียดสถานที่ และ คำอธิบาย */}
        <p style={{ margin: '0.15rem 0' }}><strong>สถานที่:</strong> {request.location}</p>
        <p style={{ margin: '0.15rem 0' }}><strong>รายละเอียด:</strong> {request.details}</p>
      </div>

      <button type="button" onClick={() => onDeleteRequest(request.id)}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;