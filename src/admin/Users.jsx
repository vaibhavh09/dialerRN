import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

const Users = () => {
    const [showForm, setShowForm] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [successMessage, setSuccessMessage] = useState(""); 
    const navigate = useNavigate();

    function generatePassword() {
        return Math.random().toString(36).slice(-8); 
    }

    const resetForm = () => {
        setFormData({
            companyName: "",
            vendorName: "",
            email: "",
            password: generatePassword(), 
            phoneNo: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            numCounsellors: "",
            duration: "",
        });
    };

    const [formData, setFormData] = useState({
        companyName: "",
        vendorName: "",
        email: "",
        password: generatePassword(),
        phoneNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        numCounsellors: "",
        duration: "",
    });

    useEffect(() => {
        let isMounted = true;  
        const fetchVendors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "vendorsDetails"));
                if (isMounted) {
                    setVendors(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                }
            } catch (error) {
                console.error("Error fetching vendors:", error);
            }
        };
        fetchVendors();
        return () => (isMounted = false); 
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (vendors.some((vendor) => vendor.email === formData.email)) {
            alert("This email is already registered!");
            return;
        }

        if (!/^\d{10}$/.test(formData.phoneNo)) {
            alert("Please enter a valid 10-digit phone number!");
            return;
        }

        if (formData.numCounsellors < 0) {
            alert("Number of counsellors cannot be negative!");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "vendorsDetails"), formData);
            setVendors([...vendors, { id: docRef.id, ...formData }]);

            setSuccessMessage("Vendor added successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);

            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error("Error adding vendor:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage Users</h2>

            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

            <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Form" : "Add Vendor"}
            </button>

            {showForm && (
                <form style={styles.form} onSubmit={handleSubmit}>
                    {["companyName", "vendorName", "email", "phoneNo", "address", "city", "state", "country", "pincode"].map((field) => (
                        <div key={field} style={styles.formGroup}>
                            <label style={styles.label}>{field.replace(/([A-Z])/g, " $1")}:</label>
                            <input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} required style={styles.input} />
                        </div>
                    ))}

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password (Auto-Generated):</label>
                        <input type="text" name="password" value={formData.password} readOnly style={styles.input} />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>No. of Counsellors:</label>
                        <input type="number" name="numCounsellors" value={formData.numCounsellors} onChange={handleChange} required style={styles.input} min="0" />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Duration (Months):</label>
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} required style={styles.input} min="1" />
                    </div>

                    <button type="submit" style={styles.submitButton}>Add Vendor</button>
                </form>
            )}

            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={styles.th}>Vendor ID</th>
                        <th style={styles.th}>Company Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone No</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.length === 0 ? (
                        <tr><td colSpan="5" style={styles.noData}>No vendors available</td></tr>
                    ) : (
                        vendors.map((vendor) => (
                            <tr key={vendor.id}>
                                <td>{vendor.id}</td>
                                <td>{vendor.companyName}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.phoneNo}</td>
                                <td>
                                    <button style={styles.manageButton} onClick={() => navigate(`/admin-dashboard/vendor/${vendor.id}`, { state: vendor })}>Manage</button>
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
    manageButton: { backgroundColor: "#2ecc71", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }
};

export default Users;