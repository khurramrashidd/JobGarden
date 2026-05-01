import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("recruiter");
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const querySnapshot = await getDocs(collection(db, "invited_users"));
      const list = querySnapshot.docs.map(doc => doc.data());
      setInvitedUsers(list);
    };
    fetchInvites();
  }, []);

  const handleInviteUser = async () => {
    if(!email) return;
    try {
      // Add email and specific role to whitelist
      await addDoc(collection(db, "invited_users"), { 
        email: email.toLowerCase(), 
        role: selectedRole 
      });
      
      setInvitedUsers([...invitedUsers, { email: email.toLowerCase(), role: selectedRole }]);
      alert(`Access granted. When ${email} signs up, they will automatically be a ${selectedRole}.`);
      setEmail("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card animate-fade-in" style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h2>System Administration</h2>
        <p style={{ color: "var(--text-muted)" }}>Manage staff access rights for the OOAD Project.</p>
        
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <input 
            type="email" 
            placeholder="Enter Staff Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 2, minWidth: "200px" }}
          />
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ 
              flex: 1, padding: "0.75rem", borderRadius: "8px", 
              border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text-main)" 
            }}
          >
            <option value="recruiter">HR / Recruiter</option>
            <option value="interviewer">Interview Panel</option>
            <option value="admin">Administrator</option>
          </select>
          <button className="btn" onClick={handleInviteUser}>Grant Access</button>
        </div>

        <h3 style={{ marginTop: "2rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
          Pre-Authorized Staff Directory
        </h3>
        <ul style={{ paddingLeft: "0", listStyle: "none" }}>
          {invitedUsers.length === 0 ? <p style={{ color: "var(--text-muted)" }}>No staff invited yet.</p> : null}
          {invitedUsers.map((user, idx) => (
            <li key={idx} style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "8px", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
              <span>{user.email}</span>
              <span className="badge" style={{ margin: 0 }}>{user.role.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;