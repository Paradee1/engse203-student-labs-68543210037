import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest, onMarkDone }) {
  if (!requests || requests.length === 0) {
    return <p className="empty-message">ไม่พบคำร้องที่ตรงกับการค้นหา</p>;
  }

  return (
    <div className="request-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDeleteRequest={onDeleteRequest}
          onMarkDone={onMarkDone}
        />
      ))}
    </div>
  );
}

export default RequestList;