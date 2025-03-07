import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const VendorDetails = () => {
  const location = useLocation();
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVendor, setEditedVendor] = useState({});

  useEffect(() => {
    console.log("Vendor ID from URL:", vendorId);

    if (!vendorId) {
      console.error("Error: Vendor ID is missing.");
      alert("Invalid Vendor ID. Redirecting...");
      navigate(-1);
      return;
    }

    const fetchVendor = async () => {
      try {
        console.log("Fetching vendor data from Firestore...");
        const docRef = doc(db, "vendorsDetails", vendorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const vendorData = docSnap.data();
          console.log("Vendor data:", vendorData);
          setVendor(vendorData);
          setEditedVendor(vendorData);
        } else {
          console.log("No vendor found for ID:", vendorId);
          alert("Vendor not found. Redirecting...");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [vendorId, navigate]);

  const handleChange = (e) => {
    setEditedVendor({
      ...editedVendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (!vendorId) {
        alert("Vendor ID is missing. Cannot update.");
        return;
      }

      const vendorRef = doc(db, "vendorsDetails", vendorId);
      const updates = {};

      Object.keys(editedVendor).forEach((key) => {
        if (vendor && vendor[key] !== undefined && editedVendor[key] !== vendor[key]) {
          updates[key] = editedVendor[key];
        }
      });

      if (Object.keys(updates).length > 0) {
        await updateDoc(vendorRef, updates);
        setVendor({ ...vendor, ...updates });
        alert("Vendor details updated successfully!");
      } else {
        alert("No changes detected.");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating vendor details:", error);
      alert("Failed to save. Check console for details.");
    }
  };

  if (loading) return <h2 style={styles.loading}>Loading vendor details...</h2>;

  if (!vendor) {
    return (
      <div style={styles.container}>
        <h2>Vendor not found</h2>
        <button style={styles.backButton} onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Vendor Details</h2>
      {isEditing ? (
        <>
          {Object.keys(vendor).map((key) => (
            <div key={key} style={styles.field}>
              <label style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</label>
              <input 
                type="text" 
                name={key} 
                value={editedVendor[key] || ""} 
                onChange={handleChange} 
                style={styles.input} 
              />
            </div>
          ))}
          <div style={styles.buttonGroup}>
            <button style={styles.saveButton} onClick={handleSave}>Save</button>
            <button style={styles.cancelButton} onClick={() => { setEditedVendor(vendor); setIsEditing(false); }}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          {Object.entries(vendor).map(([key, value]) => (
            <p key={key} style={styles.text}><strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>
          ))}
          <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button style={styles.backButton} onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#34495e",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    border: "none",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    width: "48%",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    width: "48%",
  },
  backButton: {
    backgroundColor: "#95a5a6",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    border: "none",
    width: "100%",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
    marginTop: "20px",
  },
};

export default VendorDetails;

// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { db } from "../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// const VendorDetails = () => {
//   const location = useLocation();
//   const { vendorId } = useParams();
//   const navigate = useNavigate();
//   const [vendor, setVendor] = useState(location.state || null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedVendor, setEditedVendor] = useState({});

//   useEffect(() => {
//     if (!vendorId) {
//       console.error("Error: Vendor ID is missing.");
//       alert("Invalid Vendor ID. Redirecting...");
//       navigate(-1);
//       return;
//     }

//     const fetchVendor = async () => {
//       try {
//         if (!vendor) {
//           console.log("Fetching vendor data from Firestore...");
//           const docRef = doc(db, "vendorsDetails", vendorId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const vendorData = docSnap.data();
//             setVendor(vendorData);
//             setEditedVendor(vendorData);
//           } else {
//             console.log("No vendor found for ID:", vendorId);
//             alert("Vendor not found. Redirecting...");
//             navigate(-1);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching vendor details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendor();
//   }, [vendorId]); // Only re-run if vendorId changes

//   const handleChange = (e) => {
//     setEditedVendor({
//       ...editedVendor,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       if (!vendorId) {
//         alert("Vendor ID is missing. Cannot update.");
//         return;
//       }

//       const vendorRef = doc(db, "vendorsDetails", vendorId);
//       const updates = {};

//       Object.keys(editedVendor).forEach((key) => {
//         if (editedVendor[key] !== vendor[key]) {
//           updates[key] = editedVendor[key];
//         }
//       });

//       if (Object.keys(updates).length > 0) {
//         await updateDoc(vendorRef, updates);
//         setVendor({ ...vendor, ...updates });
//         alert("Vendor details updated successfully!");
//       } else {
//         alert("No changes detected.");
//       }

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating vendor details:", error);
//       alert("Failed to save. Check console for details.");
//     }
//   };

//   if (loading) return <h2 style={styles.loading}>Loading vendor details...</h2>;

//   if (!vendor) {
//     return (
//       <div style={styles.container}>
//         <h2>Vendor not found</h2>
//         <button style={styles.backButton} onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Vendor Details</h2>
//       {isEditing ? (
//         <>
//           {Object.keys(vendor).map((key) => (
//             <div key={key} style={styles.field}>
//               <label style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</label>
//               <input 
//                 type="text" 
//                 name={key} 
//                 value={editedVendor[key] || ""} 
//                 onChange={handleChange} 
//                 style={styles.input} 
//               />
//             </div>
//           ))}
//           <div style={styles.buttonGroup}>
//             <button style={styles.saveButton} onClick={handleSave}>Save</button>
//             <button style={styles.cancelButton} onClick={() => { setEditedVendor(vendor); setIsEditing(false); }}>Cancel</button>
//           </div>
//         </>
//       ) : (
//         <>
//           {Object.entries(vendor).map(([key, value]) => (
//             <p key={key} style={styles.text}><strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>
//           ))}
//           <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
//         </>
//       )}
//       <button style={styles.backButton} onClick={() => navigate(-1)}>Back</button>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "30px auto",
//     padding: "20px",
//     borderRadius: "10px",
//     background: "#fff",
//     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//     textAlign: "left",
//   },
//   title: {
//     textAlign: "center",
//     color: "#2c3e50",
//     marginBottom: "20px",
//   },
//   field: {
//     marginBottom: "15px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     color: "#34495e",
//     marginBottom: "5px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
//   text: {
//     fontSize: "16px",
//     color: "#555",
//     marginBottom: "8px",
//   },
//   buttonGroup: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   editButton: {
//     backgroundColor: "#3498db",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "100%",
//   },
//   saveButton: {
//     backgroundColor: "#2ecc71",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "none",
//     width: "48%",
//   },
//   cancelButton: {
//     backgroundColor: "#e74c3c",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     border: "none",
//     width: "48%",
//   },
//   backButton: {
//     backgroundColor: "#95a5a6",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "100%",
//   },
//   loading: {
//     textAlign: "center",
//     fontSize: "18px",
//     color: "#777",
//     marginTop: "20px",
//   },
// };

// export default VendorDetails;


// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { db } from "../firebase"; // Ensure db is correctly imported
// import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import updateDoc properly

// const VendorDetails = () => {
//   const location = useLocation();
//   const { vendorId } = useParams();
//   const navigate = useNavigate();
//   const [vendor, setVendor] = useState(location.state || null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedVendor, setEditedVendor] = useState({});

//   useEffect(() => {
//     const fetchVendor = async () => {
//       try {
//         if (!vendor) {
//           const docRef = doc(db, "vendorsDetails", vendorId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setVendor(docSnap.data());
//             setEditedVendor(docSnap.data()); // Initialize edited data
//           } else {
//             console.log("No such vendor!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching vendor details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendor();
//   }, [vendor, vendorId]);

//   const handleChange = (e) => {
//     setEditedVendor({
//       ...editedVendor,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async () => {
//     try {
//       const vendorRef = doc(db, "vendorsDetails", vendorId);
//       await updateDoc(vendorRef, editedVendor);
//       setVendor(editedVendor);
//       setIsEditing(false);
//       alert("Vendor details updated successfully!");
//     } catch (error) {
//       console.error("Error updating vendor details:", error);
//       alert("Failed to update vendor details.");
//     }
//   };

//   if (loading) return <h2>Loading vendor details...</h2>;

//   if (!vendor) {
//     return (
//       <div>
//         <h2>Vendor not found</h2>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Vendor Details</h2>
//       {isEditing ? (
//         <>
//           <label>Company Name:</label>
//           <input type="text" name="companyName" value={editedVendor.companyName} onChange={handleChange} />

//           <label>Vendor Name:</label>
//           <input type="text" name="vendorName" value={editedVendor.vendorName} onChange={handleChange} />

//           <label>Email:</label>
//           <input type="email" name="email" value={editedVendor.email} onChange={handleChange} />

//           <label>Phone No:</label>
//           <input type="text" name="phoneNo" value={editedVendor.phoneNo} onChange={handleChange} />

//           <label>Address:</label>
//           <input type="text" name="address" value={editedVendor.address} onChange={handleChange} />

//           <label>City:</label>
//           <input type="text" name="city" value={editedVendor.city} onChange={handleChange} />

//           <label>State:</label>
//           <input type="text" name="state" value={editedVendor.state} onChange={handleChange} />

//           <label>Country:</label>
//           <input type="text" name="country" value={editedVendor.country} onChange={handleChange} />

//           <label>Pincode:</label>
//           <input type="text" name="pincode" value={editedVendor.pincode} onChange={handleChange} />

//           <label>No. of Counsellors:</label>
//           <input type="number" name="numCounsellors" value={editedVendor.numCounsellors} onChange={handleChange} />

//           <label>Duration (months):</label>
//           <input type="number" name="duration" value={editedVendor.duration} onChange={handleChange} />

//           <button style={styles.saveButton} onClick={handleSave}>Save</button>
//           <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
//         </>
//       ) : (
//         <>
//           <p><strong>Company Name:</strong> {vendor.companyName}</p>
//           <p><strong>Vendor Name:</strong> {vendor.vendorName}</p>
//           <p><strong>Email:</strong> {vendor.email}</p>
//           <p><strong>Phone No:</strong> {vendor.phoneNo}</p>
//           <p><strong>Address:</strong> {vendor.address}</p>
//           <p><strong>City:</strong> {vendor.city}</p>
//           <p><strong>State:</strong> {vendor.state}</p>
//           <p><strong>Country:</strong> {vendor.country}</p>
//           <p><strong>Pincode:</strong> {vendor.pincode}</p>
//           <p><strong>No. of Counsellors:</strong> {vendor.numCounsellors}</p>
//           <p><strong>Duration:</strong> {vendor.duration} months</p>

//           <button style={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
//         </>
//       )}
//       <button style={styles.backButton} onClick={() => navigate(-1)}>Back</button>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     width: "400px",
//     background: "#ffffff",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     margin: "20px auto",
//     textAlign: "left",
//   },
//   editButton: {
//     backgroundColor: "#3498db",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "100%",
//   },
//   saveButton: {
//     backgroundColor: "#2ecc71",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "48%",
//     marginRight: "2%",
//   },
//   cancelButton: {
//     backgroundColor: "#e74c3c",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "48%",
//   },
//   backButton: {
//     backgroundColor: "#95a5a6",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "100%",
//   },
// };

// export default VendorDetails;

// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import { db, doc, getDoc } from "../firebase"; // Import Firestore functions

// const VendorDetails = () => {
//   const location = useLocation();
//   const { vendorId } = useParams();
//   const navigate = useNavigate();
//   const [vendor, setVendor] = useState(location.state || null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // If vendor data is not passed via state, fetch it from Firebase
//     const fetchVendor = async () => {
//       try {
//         if (!vendor) {
//           const docRef = doc(db, "vendorsDetails", vendorId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setVendor(docSnap.data());
//           } else {
//             console.log("No such vendor!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching vendor details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendor();
//   }, [vendor, vendorId]);

//   if (loading) return <h2>Loading vendor details...</h2>;

//   if (!vendor) {
//     return (
//       <div>
//         <h2>Vendor not found</h2>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Vendor Details</h2>
//       <p><strong>Company Name:</strong> {vendor.companyName}</p>
//       <p><strong>Vendor Name:</strong> {vendor.vendorName}</p>
//       <p><strong>Email:</strong> {vendor.email}</p>
//       <p><strong>Phone No:</strong> {vendor.phoneNo}</p>
//       <p><strong>Address:</strong> {vendor.address}</p>
//       <p><strong>City:</strong> {vendor.city}</p>
//       <p><strong>State:</strong> {vendor.state}</p>
//       <p><strong>Country:</strong> {vendor.country}</p>
//       <p><strong>Pincode:</strong> {vendor.pincode}</p>
//       <p><strong>No. of Counsellors:</strong> {vendor.numCounsellors}</p>
//       <p><strong>Duration:</strong> {vendor.duration} months</p>
//       <button onClick={() => navigate(-1)}>Back</button>
//     </div>
//   );
// };



// // Styles
// const styles = {
//   container: {
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     width: "400px",
//     background: "#ffffff",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     margin: "20px auto",
//     textAlign: "left",
//   },
//   backButton: {
//     backgroundColor: "#e74c3c",
//     color: "white",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//     border: "none",
//     width: "100%",
//   },
//   loading: {
//     textAlign: "center",
//     fontSize: "16px",
//     color: "#555",
//     marginTop: "20px",
//   },
// };

// export default VendorDetails;