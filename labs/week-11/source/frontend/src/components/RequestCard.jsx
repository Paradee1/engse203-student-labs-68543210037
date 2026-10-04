import { Link } from 'react-router-dom';
import { updateRequestStatus } from '../services/requestService';

function RequestCard({ request, onDeleteRequest }) {
  const handleStatusChange = async (nextStatus) => {
    try {
      await updateRequestStatus(request.id, nextStatus);
      window.location.reload(); // รีเฟรชเพื่อแสดงสถานะใหม่
    } catch (err) {
      alert('เปลี่ยนสถานะไม่สำเร็จ: ' + err.message);
    }
  };

  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>

        {/* ปุ่มเปลี่ยนสถานะที่แก้ค่าให้ตรงกับ backend */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {request.status !== 'in-progress' && (
            <button 
              className="button"
              type="button" 
              onClick={() => handleStatusChange('in-progress')}
              style={{ fontSize: '13px', padding: '4px 10px' }}
            >
              กำลังดำเนินการ
            </button>
          )}
          {request.status !== 'completed' && (
            <button 
              className="button"
              type="button" 
              onClick={() => handleStatusChange('completed')}
              style={{ fontSize: '13px', padding: '4px 10px' }}
            >
              เสร็จสิ้น
            </button>
          )}
        </div>
      </div>

      <button className="button danger" type="button" onClick={() => onDeleteRequest(request.id)} aria-label={`ลบคำร้อง ${request.id}`}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;