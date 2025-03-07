import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firebase config file
import { collection, addDoc, getDocs } from "firebase/firestore";

const CounselorManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [counselors, setCounselors] = useState([]);

    function generatePassword() {
        return Math.random().toString(36).slice(-8);
    }

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: generatePassword(),
        phoneNo: "",
    });

    useEffect(() => {
        fetchCounselors();
    }, []);

    const fetchCounselors = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "counselors"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCounselors(data);
        } catch (error) {
            console.error("Error fetching counselors:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Fetch existing counselors
          const querySnapshot = await getDocs(collection(db, "counselors"));
          const existingEmails = querySnapshot.docs.map((doc) => doc.data().email);
  
          // Check if email already exists
          if (existingEmails.includes(formData.email)) {
              setSuccessMessage("Error: Email already in use!");
              setTimeout(() => setSuccessMessage(""), 3000);
              return;
          }
  
          // Add counselor to Firestore
          await addDoc(collection(db, "counselors"), formData);
          setSuccessMessage("Counselor added successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
  
          fetchCounselors(); // Refresh table after adding
          setShowForm(false);
          setFormData({ name: "", email: "", password: generatePassword(), phoneNo: "" });
  
      } catch (error) {
          console.error("Error adding counselor:", error);
      }
  };
  
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await addDoc(collection(db, "counselors"), formData);
    //         setSuccessMessage("Counselor added successfully!");
    //         setTimeout(() => setSuccessMessage(""), 3000);

    //         fetchCounselors(); // Refresh table after adding
    //         setShowForm(false);
    //         setFormData({ name: "", email: "", password: generatePassword(), phoneNo: "" });
    //     } catch (error) {
    //         console.error("Error adding counselor:", error);
    //     }
    // };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage Counselors</h2>

            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

            <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Form" : "Add Counselor"}
            </button>

            {showForm && (
                <form style={styles.form} onSubmit={handleSubmit}>
                    {["name", "email", "phoneNo"].map((field) => (
                        <div key={field} style={styles.formGroup}>
                            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input type="text" name={field} value={formData[field]} onChange={handleChange} required style={styles.input} />
                        </div>
                    ))}

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password (Auto-Generated):</label>
                        <input type="text" name="password" value={formData.password} readOnly style={styles.input} />
                    </div>

                    <button type="submit" style={styles.submitButton}>Add Counselor</button>
                </form>
            )}

            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Password</th>
                        <th style={styles.th}>Phone No</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {counselors.length === 0 ? (
                        <tr><td colSpan="6" style={styles.noData}>No counselors available</td></tr>
                    ) : (
                        counselors.map((counselor, index) => (
                            <tr key={counselor.id}>
                                <td>{index + 1}</td>
                                <td>{counselor.name}</td>
                                <td>{counselor.email}</td>
                                <td>{counselor.password}</td>
                                <td>{counselor.phoneNo}</td>
                                <td>
                                    <button style={styles.manageButton}>Manage Vendor</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: { padding: "20px" },
    heading: { fontSize: "24px", marginBottom: "10px" },
    successMessage: { color: "green", fontSize: "16px", marginBottom: "10px" },
    addButton: { backgroundColor: "#3498db", color: "white", padding: "10px", cursor: "pointer", borderRadius: "5px", marginBottom: "10px" },
    form: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px" },
    formGroup: { display: "flex", flexDirection: "column" },
    label: { fontSize: "14px", fontWeight: "bold" },
    input: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" },
    submitButton: { gridColumn: "span 2", backgroundColor: "#2ecc71", color: "white", padding: "10px", cursor: "pointer", borderRadius: "5px" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" },
    tableHeader: { backgroundColor: "#3498db", color: "white", fontWeight: "bold", textAlign: "left" },
    th: { padding: "12px", borderBottom: "2px solid #ddd" },
    noData: { textAlign: "center", padding: "15px", fontStyle: "italic", color: "#888" },
    manageButton: { backgroundColor: "#e74c3c", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }
};

export default CounselorManagement;