import { useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";
import RequestForm from "./components/RequestForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import RequestList from "./components/RequestList.jsx";
import { initialRequests } from "./data/initialRequests.js";

function App() {
  // LAB4-R04: กำหนด State สำหรับเก็บรายการคำร้อง และสถานะการกรอง
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState("all");

  // LAB4-R04: คำนวณ summary เป็น Derived Data จากข้อมูลคำร้องจริง
  const summary = {
    total: requests.length,
    pending: requests.filter((req) => req.status === "pending").length,
    inProgress: requests.filter((req) => req.status === "in-progress").length,
    completed: requests.filter((req) => req.status === "completed").length,
  };

  // LAB4-R08: คำนวณ filteredRequests ตามสถานะที่เลือกใน statusFilter
  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((req) => req.status === statusFilter);

  // LAB4-R07: เพิ่มคำร้องใหม่
  function handleAddRequest(requestData) {
    const maxIdNum = requests.reduce((max, req) => {
      const match = req.id.match(/^REQ-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 0);

    const nextNum = maxIdNum + 1;
    const newId = `REQ-${String(nextNum).padStart(3, "0")}`;

    const newRequest = {
      id: newId,
      ...requestData,
      status: "pending",
    };

    setRequests((prevRequests) => [newRequest, ...prevRequests]);
  }

  // LAB4-R10: ลบรายการคำร้องด้วย id โดยใช้ .filter()
  function handleDeleteRequest(requestId) {
    setRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId),
    );
  }

  // ฟังก์ชันสลับการกรองสถานะ
  function handleFilterChange(newFilter) {
    setStatusFilter(newFilter);
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar
                value={statusFilter}
                onFilterChange={handleFilterChange}
              />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
