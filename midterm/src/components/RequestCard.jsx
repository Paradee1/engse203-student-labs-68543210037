import { Link } from 'react-router-dom';
import PriorityBadge from './PriorityBadge.jsx';

function RequestCard({ request, onDeleteRequest, onMarkDone }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        
        {/* แทน {request.priority} ด้วย PriorityBadge */}
        <p>
          <span className={`badge ${request.status}`}>{request.status}</span> ·{' '}
          <PriorityBadge priority={request.priority} />

        </p>
      </div>
      <div>
        {/* แสดงปุ่ม "ทำเสร็จ" เฉพาะเมื่อสถานะยังไม่ completed */}
        {request.status !== 'completed' && (
          <button
            className="button secondary"
            type="button"
            onClick={() => onMarkDone && onMarkDone(request.id)}
            aria-label={`ทำเสร็จคำร้อง ${request.id}`}
          >
            ทำเสร็จ
          </button>
        )}
        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;