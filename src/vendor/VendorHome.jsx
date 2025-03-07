import React, { useState } from "react";

const VendorHome = () => {
  const [reportType, setReportType] = useState("Activity - Summary");
  const [timePeriod, setTimePeriod] = useState("03/01/2021 - 03/31/2021");
  const [selectedUsers, setSelectedUsers] = useState("All Users Selected");
  const [reportData, setReportData] = useState(null);

  const handleApply = () => {
    setReportData(`${reportType}: ${timePeriod}`);
  };

  return (
    <div style={styles.container}>
      {/* Reports Section (Unified) */}
      <div style={styles.reportsContainer}>
        <h2 style={styles.header}>Reports</h2>

        <div style={styles.filters}>
          <div style={styles.filterItem}>
            <label>Report Type</label>
            <select
              style={styles.select}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option>Activity - Summary</option>
              <option>Calls Report</option>
              <option>Tasks Report</option>
            </select>
          </div>

          <div style={styles.filterItem}>
            <label>Activity Time Period</label>
            <input
              type="text"
              style={styles.input}
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            />
          </div>

          <div style={styles.filterItem}>
            <label>Select Users</label>
            <select
              style={styles.select}
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value)}
            >
              <option>All Users Selected</option>
              <option>User 1</option>
              <option>User 2</option>
            </select>
          </div>

          <div style={styles.buttons}>
            <button style={styles.applyButton} onClick={handleApply}>
              Apply
            </button>
            <button style={styles.resetButton} onClick={() => setReportData(null)}>
              Reset
            </button>
          </div>
        </div>

        {/* Report Summary Inside the Same Container */}
        <div style={styles.summary}>
          {reportData ? <p>{reportData}</p> : <p>No Data Available</p>}
        </div>
      </div>

      {/* Data Boxes Fixed at Bottom */}
      <div style={styles.dataContainer}>
        {[
          { title: "CONTACTS", value: 24, color: "#dc3545" },
          { title: "CALLS IN", value: 237, color: "#007bff" },
          { title: "CALLS OUT", value: 1223, color: "#28a745" },
          { title: "SMS", value: 49, color: "#6c757d" },
          { title: "NOTES", value: 407, color: "#17a2b8" },
          { title: "EVENTS", value: 20, color: "#ffc107" },
          { title: "TALK TIME", value: "22h 25m", color: "#dc3545" },
          { title: "TASK SCHEDULED", value: 136, color: "#007bff" },
          { title: "TASK COMPLETED", value: 45, color: "#28a745" },
        ].map((item, index) => (
          <div key={index} style={{ ...styles.box, backgroundColor: item.color }}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// **Styling**
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  reportsContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  header: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "15px",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 200px",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  applyButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  resetButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  summary: {
    marginTop: "15px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
  },
  dataContainer: {
    position: "fixed",
    bottom: 0,
    left: "95px",
    width: "calc(100% - 108px)",
    padding: "10px 15px",
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
    zIndex: 1000,
  },
  box: {
    padding: "15px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default VendorHome;
