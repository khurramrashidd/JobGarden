import { useState } from "react";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <section className="card animate-fade-in" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem 2rem" }}>
        
        <header style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ 
            width: "50px", height: "50px", background: "rgba(170, 59, 255, 0.1)", 
            borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem auto"
          }}>
            <LogIn size={24} color="var(--primary)" aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Sign in to continue to JobGarden</p>
        </header>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--text-main)" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" style={{ fontSize: "0.85rem", fontWeight: "500", color: "var(--text-main)" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)} 
                required
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{ width: "100%", marginTop: "1.5rem", padding: "0.875rem" }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <footer style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid var(--border-solid)", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0" }}>
            Don't have an account? <Link to="/signup" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>Sign up</Link>
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
            (Test Admin: admin@jobgarden.com)
          </p>
        </footer>
      </section>
    </main>
  );
}