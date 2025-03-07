import React from "react";

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    { id: 1, date: "2024-03-01", amount: 500, type: "Credit", status: "Completed" },
    { id: 2, date: "2024-03-02", amount: 200, type: "Debit", status: "Pending" },
    { id: 3, date: "2024-03-03", amount: 1000, type: "Credit", status: "Completed" },
    { id: 4, date: "2024-03-04", amount: 300, type: "Debit", status: "Failed" },
  ];

  return (
    <div style={styles.container}>
      <h2>Transactions</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} style={styles.row}>
              <td style={styles.td}>{transaction.id}</td>
              <td style={styles.td}>{transaction.date}</td>
              <td style={styles.td}>${transaction.amount}</td>
              <td style={styles.td}>{transaction.type}</td>
              <td style={{ ...styles.td, color: getStatusColor(transaction.status) }}>
                {transaction.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Function to set color based on transaction status
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "green";
    case "Pending":
      return "orange";
    case "Failed":
      return "red";
    default:
      return "black";
  }
};

// Styles for the table
const styles = {
  container: {
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  headerRow: {
    backgroundColor: "#3498db",
    color: "white",
  },
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  row: {
    backgroundColor: "#f9f9f9",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
};

export default Transactions;
