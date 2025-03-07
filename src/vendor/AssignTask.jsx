import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import * as XLSX from "xlsx"; // ✅ Import XLSX for Excel processing

const AssignTask = () => {
  const [counselors, setCounselors] = useState([]);
  const [excelData, setExcelData] = useState([]);

  // Fetch counselors from Firestore
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "counselors"));
        const counselorList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCounselors(counselorList);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };
    fetchCounselors();
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setExcelData(jsonData); // Save structured data
    };
    reader.readAsBinaryString(file);
  };

  // Assign task (Excel data) to a counselor
  const assignTask = async (counselorId) => {
    if (!excelData.length) {
      alert("Please upload an Excel file first.");
      return;
    }

    try {
      console.log("Assigning task to:", counselorId);

      const counselorRef = doc(db, "counselors", counselorId);
      const counselorSnap = await getDoc(counselorRef);

      if (!counselorSnap.exists()) {
        console.error("Counselor not found in Firestore!");
        alert("Error: Counselor not found.");
        return;
      }

      const existingTasks = counselorSnap.data().assignedTasks || [];

      // Ensure each task follows the desired field structure
      const formattedTasks = excelData.map(task => ({
        srNo: task["Sr.no"] || "",
        firstName: task["First Name"] || "",
        lastName: task["Last Name"] || "",
        contactNo: task["Contact No"] || "",
        email: task["Email"] || "",
        Company: task["Company"] || "",
        city: task["City"] || "",
        pincode: task["Pincode"] || "",
        state: task["State"] || "",
      }));

      const updatedTasks = [...existingTasks, ...formattedTasks];

      // Updating Firestore document with structured task data
      await updateDoc(counselorRef, { assignedTasks: updatedTasks });

      console.log("Task assigned successfully!");
      alert("Task assigned successfully!");

      // Reset state
      setExcelData([]);
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h2>Assign Task</h2>
      </div>

      {/* File Upload */}
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={styles.fileInput} />

      {/* Table Section */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Counselor Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {counselors.map((counselor) => (
            <tr key={counselor.id}>
              <td style={styles.td}>{counselor.name}</td>
              <td style={styles.td}>{counselor.email}</td>
              <td style={styles.td}>
                <button 
                  style={styles.assignButton} 
                  onClick={() => assignTask(counselor.id)}
                >
                  Assign Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// **Styling**
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    marginBottom: "20px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
  },
  fileInput: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
  },
  th: {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  assignButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default AssignTask;



// import React, { useEffect, useState } from "react";
// import { db } from "../firebase"; 
// import { collection, getDocs, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
// import * as XLSX from "xlsx"; // ✅ Import XLSX for Excel processing

// const AssignTask = () => {
//   const [counselors, setCounselors] = useState([]);
//   const [selectedCounselor, setSelectedCounselor] = useState(null);
//   const [excelData, setExcelData] = useState([]);

//   // Fetch counselors from Firestore
//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "counselors"));
//         const counselorList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setCounselors(counselorList);
//       } catch (error) {
//         console.error("Error fetching counselors:", error);
//       }
//     };
//     fetchCounselors();
//   }, []);

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const binaryString = e.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(jsonData); // Save table format data
//     };
//     reader.readAsBinaryString(file);
//   };

//   // Assign the task (Excel data) to a counselor
  
// const assignTask = async (counselorId) => {
//   if (!excelData.length) {
//     alert("Please upload an Excel file first.");
//     return;
//   }

//   try {
//     console.log("Assigning task to:", counselorId); // Debugging

//     const counselorRef = doc(db, "counselors", counselorId);
//     const counselorSnap = await getDoc(counselorRef);

//     if (!counselorSnap.exists()) {
//       console.error("Counselor not found in Firestore!");
//       alert("Error: Counselor not found.");
//       return;
//     }

//     const existingTasks = counselorSnap.data().assignedTasks || [];
//     console.log("Existing tasks:", existingTasks); // Debugging

//     const updatedTasks = [...existingTasks, ...excelData];

//     // Updating Firestore document
//     await updateDoc(counselorRef, { assignedTasks: updatedTasks });

//     console.log("Task assigned successfully!");
//     alert("Task assigned successfully!");

//     // Reset state
//     setSelectedCounselor(null);
//     setExcelData([]);
//   } catch (error) {
//     console.error("Error assigning task:", error);
//     alert("Failed to assign task. Check console for details.");
//   }
// };

//   // const assignTask = async (counselorId) => {
//   //   if (!excelData.length) {
//   //     alert("Please upload an Excel file first.");
//   //     return;
//   //   }

//   //   try {
//   //     const counselorRef = doc(db, "counselors", counselorId);
//   //     await updateDoc(counselorRef, { assignedTasks: excelData });

//   //     alert("Task assigned successfully!");
//   //     setSelectedCounselor(null);
//   //     setExcelData([]);
//   //   } catch (error) {
//   //     console.error("Error assigning task:", error);
//   //   }
//   // };

//   return (
//     <div style={styles.container}>
//       {/* Header Section */}
//       <div style={styles.header}>
//         <h2>Assign Task</h2>
//       </div>

//       {/* File Upload */}
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={styles.fileInput} />

//       {/* Table Section */}
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Counselor Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {counselors.map((counselor) => (
//             <tr key={counselor.id}>
//               <td style={styles.td}>{counselor.name}</td>
//               <td style={styles.td}>{counselor.email}</td>
//               <td style={styles.td}>
//               <button 
//   style={styles.assignButton} 
//   onClick={() => {
//     console.log("Assign Task button clicked!");
//     assignTask(counselor.id);
//   }}
// >
//   Assign Task
// </button>

//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // **Styling**
// const styles = {
//   container: {
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     minHeight: "100vh",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     marginBottom: "20px",
//     boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
//   },
//   fileInput: {
//     marginBottom: "20px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     backgroundColor: "white",
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
//   assignButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "none",
//   },
// };

// export default AssignTask;


// import React, { useEffect, useState } from "react";
// import { db, storage } from "../firebase"; // Adjust paths based on your project structure
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const AssignTask = () => {
//   const [counselors, setCounselors] = useState([]);

//   // Fetch counselors from Firebase
//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "counselors"));
//         const counselorList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCounselors(counselorList);
//       } catch (error) {
//         console.error("Error fetching counselors:", error);
//       }
//     };
//     fetchCounselors();
//   }, []);

//   // Handle File Upload
//   const handleFileUpload = async (counselorId) => {
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = ".xlsx, .xls"; // Accept only Excel files

//     fileInput.onchange = async (event) => {
//       const file = event.target.files[0];
//       if (!file) return;

//       const storageRef = ref(storage, `tasks/${counselorId}/${file.name}`);
//       try {
//         await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(storageRef);

//         // Update Firestore with assigned task URL
//         const counselorRef = doc(db, "counselors", counselorId);
//         await updateDoc(counselorRef, { assignedTask: downloadURL });

//         alert("Task assigned successfully!");
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     };

//     fileInput.click();
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header Section */}
//       <div style={styles.header}>
//         <h2>Assign Task</h2>
//       </div>

//       {/* Table Section */}
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Counselor Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {counselors.map((counselor) => (
//             <tr key={counselor.id}>
//               <td style={styles.td}>{counselor.name}</td>
//               <td style={styles.td}>{counselor.email}</td>
//               <td style={styles.td}>
//                 <button
//                   style={styles.assignButton}
//                   onClick={() => handleFileUpload(counselor.id)}
//                 >
//                   Assign Task
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // **Styling**
// const styles = {
//   container: {
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     minHeight: "100vh",
//   },
//   header: {
//     backgroundColor: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     marginBottom: "20px",
//     boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     backgroundColor: "white",
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
//   assignButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "none",
//   },
// };

// export default AssignTask;




// import React, { useEffect, useState } from "react";
// import { db } from "../firebase"; // Adjust the path based on your project structure
// import { collection, getDocs } from "firebase/firestore";

// const AssignTask = () => {
//   const [counselors, setCounselors] = useState([]);

//   // Fetch counselors from Firebase
//   useEffect(() => {
//     const fetchCounselors = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "counselors"));
//         const counselorList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setCounselors(counselorList);
//       } catch (error) {
//         console.error("Error fetching counselors:", error);
//       }
//     };
//     fetchCounselors();
//   }, []);

//   return (
//     <div style={styles.container}>
//       {/* Header Section */}
//       <div style={styles.header}>
//         <h2>Assign Task</h2>
//       </div>

//       {/* Table Section */}
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Counselor Name</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {counselors.map((counselor) => (
//             <tr key={counselor.id}>
//               <td style={styles.td}>{counselor.name}</td>
//               <td style={styles.td}>{counselor.email}</td>
//               <td style={styles.td}>
//                 <button style={styles.assignButton}>Assign Task</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // **Styling**
// const styles = {
//   container: {
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     minHeight: "100vh",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     marginBottom: "20px",
//     boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     backgroundColor: "white",
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
//   assignButton: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "5px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "none",
//   },
// };

// export default AssignTask;