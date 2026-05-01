import { useState } from "react";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, UserPlus } from "lucide-react";

const ROLE_CODES = {
  "admin123": "admin",
  "recruit123": "recruiter",
  "inter123": "interviewer"
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let assignedRole = "applicant"; 

      if (accessCode.trim() !== "") {
        if (ROLE_CODES[accessCode]) {
          assignedRole = ROLE_CODES[accessCode];
        } else {
          setIsLoading(false);
          return alert("Invalid Access Code. Leave blank if you are an applicant.");
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        role: assignedRole,
        createdAt: new Date().toISOString()
      });

      alert(`Account created successfully! Assigned Role: ${assignedRole.toUpperCase()}`);
      navigate("/dashboard");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "85vh", padding: "2rem 1rem" }}>
      <section className="card animate-fade-in" style={{ width: "100%", maxWidth: "450px", padding: "2.5rem 2rem" }}>
        
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ 
            width: "50px", height: "50px", background: "rgba(170, 59, 255, 0.1)", 
            borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem auto"
          }}>
            <UserPlus size={24} color="var(--primary)" aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Join the JobGarden network today</p>
        </header>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="fullName" style={{ fontSize: "0.85rem", fontWeight: "500" }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input id="fullName" type="text" placeholder="John Doe" onChange={(e)=>setName(e.target.value)} required style={{ paddingLeft: "2.5rem" }} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: "500" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input id="email" type="email" placeholder="you@example.com" onChange={(e)=>setEmail(e.target.value)} required style={{ paddingLeft: "2.5rem" }} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" style={{ fontSize: "0.85rem", fontWeight: "500" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input id="password" type="password" placeholder="Create a password" onChange={(e)=>setPassword(e.target.value)} required style={{ paddingLeft: "2.5rem" }} />
            </div>
          </div>
          
          {/* Staff Section isolated visually */}
          <div style={{ 
            marginTop: "1.5rem", padding: "1rem", borderRadius: "8px", 
            background: "rgba(15, 23, 42, 0.03)", border: "1px dashed var(--border-solid)" 
          }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label htmlFor="accessCode" style={{ fontSize: "0.85rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Shield size={14} color="var(--primary)" /> Staff Access Code <span style={{ color: "var(--text-muted)", fontWeight: "normal" }}>(Optional)</span>
              </label>
              <input 
                id="accessCode" type="text" placeholder="Leave blank if Applicant" 
                onChange={(e)=>setAccessCode(e.target.value)} 
                style={{ background: "var(--surface-solid)" }}
              />
            </div>
          </div>

          <button type="submit" className="btn" style={{ width: "100%", marginTop: "1.5rem", padding: "0.875rem" }} disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}>
          Already have an account? <Link to="/" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>Log in</Link>
        </p>
      </section>
    </main>
  );
}