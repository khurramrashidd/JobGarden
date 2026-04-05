import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="header-fixed">
      <h2 style={{ margin: 0 }}>
        <Link to="/dashboard" style={{textDecoration: 'none', color: 'var(--primary)'}}>🌱 JobGarden</Link>
      </h2>
      
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button className="btn btn-outline" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        
        {user && (
          <>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginRight: "10px" }}>
              Role: <strong style={{color: "var(--primary)"}}>{role?.toUpperCase()}</strong>
            </span>
            {role === 'admin' && <Link to="/admin" className="btn btn-outline">Admin Panel</Link>}
            {role === 'recruiter' && <Link to="/post-job" className="btn btn-outline">Post Job</Link>}
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}