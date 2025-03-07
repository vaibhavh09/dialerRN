import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function CounselorLogin() {
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fetch counselors from Firestore
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "counselors"));
        const counselorList = querySnapshot.docs.map((doc) => doc.data());
        setCounselors(counselorList);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchCounselors();
  }, []);

  const handleLogin = () => {
    setError("");

    // Find counselor with the entered email
    const counselor = counselors.find((c) => c.email === email);

    if (!counselor) {
      setError("Counselor not found. Please check your email.");
      return;
    }

    if (counselor.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // Successful login - Navigate to Counselor Dashboard with details
    navigate("/counsellor-dashboard", { state: { counselor } });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Counselor Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}

// **Styles for Counselor Login**
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "15px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default CounselorLogin;


// import { useNavigate } from "react-router-dom";

// function CounsellorLogin() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate("/counsellor-dashboard");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Counsellor Login</h2>
//       <button onClick={handleLogin}>Login as Counsellor</button>
//     </div>
//   );
// }

// export default CounsellorLogin;