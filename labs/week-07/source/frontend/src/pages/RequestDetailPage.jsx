import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequestById, updateRequestStatus } from '../services/requestService.js';

function RequestDetailPage() {
  const { requestId } = useParams();
  const [loadState, setLoadState] = useState('loading');
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, reload] = useManualReload();

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const STATUS_OPTIONS = ['pending', 'in-progress', 'completed'];

  async function handleChangeStatus(nextStatus) {
    if (request?.status === nextStatus) return;

    setUpdating(true);
    setUpdateError(null);
    try {
      const updated = await updateRequestStatus(request.id, nextStatus);
      setRequest(updated);
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'ไม่สามารถอัปเดตสถานะได้');
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    let ignore = false;
    setLoadState('loading');
    getRequestById(requestId)
      .then((result) => {
        if (ignore) return;
        setRequest(result);
        setLoadState('success');
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(error instanceof Error ? error.message : 'โหลดรายละเอียดไม่สำเร็จ');
        setLoadState('error');
      });
    return () => {
      ignore = true;
    };
  }, [requestId, reloadKey]);

  return (
    <section data-testid="page-request-detail">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">DYNAMIC ROUTE</p>
          <h1>รายละเอียดคำร้อง</h1>
          <p>Request ID: <code className="request-id">{requestId}</code></p>
        </div>
      </div>

      {loadState === 'loading' && <LoadingState message="กำลังโหลดรายละเอียด…" />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={reload} />}
      {loadState === 'success' && !request && (
        <section className="state-card">
          <h2>ไม่พบคำร้อง</h2>
          <p>ไม่พบข้อมูลสำหรับ ID <code>{requestId}</code></p>
          <Link to="/" className="button secondary inline">กลับ Dashboard</Link>
        </section>
      )}

      {loadState === 'success' && request && (
        <article className="panel detail-card">
          <h2>{request.requestType}</h2>
          <dl>
            <div><dt>ID</dt><dd>{request.id}</dd></div>
            <div><dt>ผู้แจ้ง</dt><dd>{request.requesterName}</dd></div>
            <div><dt>สถานที่</dt><dd>{request.location}</dd></div>
            <div><dt>รายละเอียด</dt><dd>{request.details}</dd></div>
            <div><dt>ความเร่งด่วน</dt><dd>{request.priority}</dd></div>
            <div>
              <dt>สถานะ</dt>
              <dd>
                <span className={`badge ${request.status}`}>{request.status}</span>
              </dd>
            </div>
          </dl>

          {/* กล่องแสดง Error ตามคลาส .error ของระบบ */}
          {updateError && (
            <p className="error" role="alert">
              {updateError}
            </p>
          )}

          {/* กลุ่มปุ่มเปลี่ยนสถานะตามคลาส .field และ .filter-bar */}
          <div className="field">
            <label>เปลี่ยนสถานะคำร้อง</label>
            <div className="filter-bar">
              {STATUS_OPTIONS.map((status) => {
                const isCurrent = request.status === status;
                return (
                  <button
                    key={status}
                    type="button"
                    disabled={updating || isCurrent}
                    onClick={() => handleChangeStatus(status)}
                    className={`button ${isCurrent ? 'primary' : 'secondary'}`}
                  >
                    {updating && !isCurrent ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        กำลังอัปเดต…
                      </>
                    ) : (
                      status
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Link to="/" className="button secondary inline">กลับ Dashboard</Link>
          </div>
        </article>
      )}
    </section>
  );
}

export default RequestDetailPage;