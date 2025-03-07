import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const CounsellorDashboard = () => {
  const location = useLocation();
  const counselor = location.state?.counselor || null;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!counselor || !counselor.id) {
      console.error("❌ No counselor ID found.");
      setLoading(false);
      return;
    }

    const docRef = doc(db, "counselors", counselor.id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().assignedTasks || [];
        console.log("✅ Fetched Tasks:", data);
        setTasks(data);
      } else {
        console.warn("⚠ No assigned tasks found.");
        setTasks([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [counselor]);

  return (
    <div style={styles.container}>
      <h2>Welcome to the Counsellor Dashboard</h2>

      <div style={styles.taskContainer}>
        <h3>Assigned Tasks</h3>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Sr. No</th>
                  <th style={styles.th}>First Name</th>
                  <th style={styles.th}>Last Name</th>
                  <th style={styles.th}>Contact No</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>City</th>
                  <th style={styles.th}>Pincode</th>
                  <th style={styles.th}>State</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{task.srNo || "-"}</td>
                    <td style={styles.td}>{task.firstName || "-"}</td>
                    <td style={styles.td}>{task.lastName || "-"}</td>
                    <td style={styles.td}>{task.contactNo || "-"}</td>
                    <td style={styles.td}>{task.email || "-"}</td>
                    <td style={styles.td}>{task.company || "-"}</td>
                    <td style={styles.td}>{task.city || "-"}</td>
                    <td style={styles.td}>{task.pincode || "-"}</td>
                    <td style={styles.td}>{task.state || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

// **Styles**
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  taskContainer: {
    marginTop: "20px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};

export default CounsellorDashboard;



// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { db } from "./firebase";
// import { doc, onSnapshot } from "firebase/firestore";

// const CounsellorDashboard = () => {
//   const location = useLocation();
//   const counselor = location.state?.counselor || null; // Get logged-in counselor details
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     if (!counselor || !counselor.id) {
//       console.error("No counselor ID found");
//       return;
//     }

//     // 🔥 Firestore real-time listener for tasks
//     const docRef = doc(db, "counselors", counselor.id);
//     const unsubscribe = onSnapshot(docRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setTasks(docSnap.data().assignedTasks || []);
//       } else {
//         console.log("No assigned tasks found.");
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [counselor]);

//   return (
//     <div style={styles.container}>
//       <h2>Welcome to the Counsellor Dashboard</h2>

//       {/* Display Assigned Tasks */}
//       <div style={styles.taskContainer}>
//         <h3>Assigned Tasks</h3>
//         {tasks.length > 0 ? (
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 {Object.keys(tasks[0]).map((key) => (
//                   <th key={key} style={styles.th}>{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task, index) => (
//                 <tr key={index}>
//                   {Object.values(task).map((value, i) => (
//                     <td key={i} style={styles.td}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No tasks assigned.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // **Styles**
// const styles = {
//   container: {
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     minHeight: "100vh",
//   },
//   taskContainer: {
//     marginTop: "20px",
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   th: {
//     backgroundColor: "black",
//     color: "white",
//     padding: "10px",
//     textAlign: "left",
//   },
//   td: {
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//     textAlign: "left",
//   },
// };

// export default CounsellorDashboard;
