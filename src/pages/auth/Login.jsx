import { useState } from "react";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div className="card animate-fade-in" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Welcome Back</h2>
        
        <div className="input-group">
          <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <button className="btn" onClick={handleLogin} style={{ width: "100%" }}>Login</button>

        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Don't have an account? <Link to="/signup" style={{ color: "var(--primary)" }}>Signup</Link>
        </p>
        <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          (Test Admin: admin@jobgarden.com)
        </p>
      </div>
    </div>
  );
}

export default Login;