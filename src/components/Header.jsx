import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/"); // Fallback to ensure UI navigates away
    }
  };

  return (
    <>
      <header className="header-fixed">
        <h2 style={{ margin: 0 }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--primary)' }}>
            🌱 JobGarden
          </Link>
        </h2>
        
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Global Search Button */}
          {user && (
            <button className="btn btn-outline" onClick={() => setIsSearchOpen(true)} style={{ padding: "0.5rem 1rem" }}>
              <Search size={18} /> Search
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button className="btn btn-outline" onClick={toggleTheme} style={{ padding: "0.5rem 1rem" }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          
          {user && (
            <>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: "10px" }}>
                Role: <strong style={{ color: "var(--primary)" }}>{role?.toUpperCase()}</strong>
              </span>
              
              {/* Route mapping based on roles */}
              {role === 'admin' && (
                <Link to="/admin" className="btn btn-outline">Admin Panel</Link>
              )}
              {(role === 'admin' || role === 'recruiter') && (
                <Link to="/recruiter-dashboard" className="btn btn-outline">Recruitment Hub</Link>
              )}
              {role === 'interviewer' && (
                <Link to="/interviewer-dashboard" className="btn btn-outline">My Interviews</Link>
              )}
              
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </header>

      {/* Render the modal at the Header level so it overlaps everything */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}