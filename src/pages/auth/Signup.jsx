import { useState } from "react";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

// Define your secret codes here for testing
const ROLE_CODES = {
  "HR-REC-2026": "recruiter",
  "PANEL-INT-2026": "interviewer",
  "ADMIN-SYS-2026": "admin"
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState(""); // Optional field
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      let assignedRole = "applicant"; // Default role

      // 1. Check if user entered a valid secret access code
      if (accessCode.trim() !== "") {
        if (ROLE_CODES[accessCode]) {
          assignedRole = ROLE_CODES[accessCode];
        } else {
          return alert("Invalid Access Code. Leave blank if you are an applicant.");
        }
      } 
      // 2. If no code, check if the Admin explicitly invited this email via Dashboard
      else {
        const q = query(collection(db, "invited_users"), where("email", "==", email.toLowerCase()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          assignedRole = querySnapshot.docs[0].data().role;
        }
      }

      // Proceed with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save User Data & Role in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email.toLowerCase(),
        role: assignedRole,
        createdAt: new Date().toISOString()
      });

      alert(`Account created successfully! Assigned Role: ${assignedRole.toUpperCase()}`);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div className="card animate-fade-in" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Create Account</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Join the Recruitment System</p>

        <div className="input-group">
          <input placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        {/* Optional Access Code Field */}
        <div className="input-group" style={{ marginTop: "1rem" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Staff Access Code (Optional)</label>
          <input 
            type="text" 
            placeholder="Leave blank for Applicant" 
            onChange={(e)=>setAccessCode(e.target.value)} 
          />
        </div>

        <button className="btn" onClick={handleSignup} style={{ width: "100%", marginTop: "1rem" }}>Signup</button>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account? <Link to="/" style={{ color: "var(--primary)" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;