import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function InterviewerDashboard() {
  const { user } = useContext(AuthContext);
  const [assignedApplicants, setAssignedApplicants] = useState([]);

  useEffect(() => {
    // In a real app, fetch from Firestore: 
    // query(collection(db, "applications"), where("assignedPanel", "==", user.email))
    
    // Mock data simulation for demo
    setAssignedApplicants([
      { id: "app1", applicantName: "Alice Smith", role: "React Developer", resumeLink: "alice_resume.pdf", score: "85%" }
    ]);
  }, [user]);

  return (
    <div className="container animate-fade-in">
      <h2>Interview Panel Dashboard</h2>
      <p style={{ color: "var(--text-muted)" }}>Applicants assigned to you for technical rounds.</p>

      <div className="job-grid" style={{ gridTemplateColumns: "1fr", marginTop: "2rem" }}>
        {assignedApplicants.map(app => (
          <div key={app.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{app.applicantName}</h3>
                <span className="badge">{app.role}</span>
                <p style={{ marginTop: "1rem", color: "var(--text-main)" }}>ATS Match Score: <strong style={{color: "#4ade80"}}>{app.score}</strong></p>
              </div>
              <button className="btn btn-outline">View Resume ({app.resumeLink})</button>
            </div>
            
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
              <button className="btn">Submit Interview Feedback</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}