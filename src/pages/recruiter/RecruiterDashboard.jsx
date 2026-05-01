import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("applicants");
  const [applicants, setApplicants] = useState([]);
  const [interviewers, setInterviewers] = useState([]);

  // Fetch mock data or Firebase data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users to find interviewers
        const usersSnap = await getDocs(collection(db, "users"));
        const panelList = [];
        usersSnap.forEach(doc => {
          if (doc.data().role === "interviewer") panelList.push(doc.data());
        });
        setInterviewers(panelList);

        // Fetch applications
        const appSnap = await getDocs(collection(db, "applications"));
        const appList = [];
        appSnap.forEach(doc => appList.push({ id: doc.id, ...doc.data() }));
        setApplicants(appList);
      } catch (err) {
        console.log("Using fallback mock data if Firestore isn't fully populated yet.");
        // Fallback mock data for testing UI immediately
        setInterviewers([{ email: "panel@test.com", name: "John Expert", role: "interviewer" }]);
        setApplicants([{ id: "app1", applicantName: "Alice Smith", applicantEmail: "alice@test.com", role: "React Developer", status: "Pending", assignedPanel: null }]);
      }
    };
    fetchData();
  }, []);

  const assignInterviewer = async (appId, panelEmail) => {
    try {
      // In a real app, update Firebase:
      // await updateDoc(doc(db, "applications", appId), { assignedPanel: panelEmail, status: "Interview Scheduled" });
      
      // Update local state for immediate feedback
      setApplicants(applicants.map(app => 
        app.id === appId ? { ...app, assignedPanel: panelEmail, status: "Interview Scheduled" } : app
      ));
      alert(`Interviewer ${panelEmail} assigned successfully!`);
    } catch (err) {
      alert("Error assigning interviewer.");
    }
  };

  return (
    <div className="container animate-fade-in">
      <h2>Recruiter & Admin Workspace</h2>
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button className={`btn ${activeTab === 'applicants' ? '' : 'btn-outline'}`} onClick={() => setActiveTab('applicants')}>
          Manage Applicants
        </button>
        <button className={`btn ${activeTab === 'panel' ? '' : 'btn-outline'}`} onClick={() => setActiveTab('panel')}>
          View Interview Panel
        </button>
      </div>

      {activeTab === 'applicants' && (
        <div className="job-grid" style={{ gridTemplateColumns: "1fr" }}>
          {applicants.map(app => (
            <div key={app.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: "0 0 0.5rem 0" }}>{app.applicantName} <span className="badge">{app.role}</span></h3>
                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>{app.applicantEmail}</p>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>Status: <strong>{app.status}</strong></p>
                {app.assignedPanel && <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", color: "var(--primary)" }}>Assigned to: {app.assignedPanel}</p>}
              </div>
              
              <div>
                <select 
                  onChange={(e) => assignInterviewer(app.id, e.target.value)}
                  style={{ padding: "0.5rem", borderRadius: "8px", background: "var(--bg)", color: "var(--text-main)", border: "1px solid var(--border)" }}
                  defaultValue=""
                >
                  <option value="" disabled>Assign Interviewer...</option>
                  {interviewers.map((panel, idx) => (
                    <option key={idx} value={panel.email}>{panel.name || panel.email}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'panel' && (
        <div className="job-grid">
          {interviewers.map((panel, idx) => (
            <div key={idx} className="card">
              <h3>{panel.name || panel.email.split('@')[0]}</h3>
              <p style={{ color: "var(--text-muted)" }}>{panel.email}</p>
              <span className="badge">Interview Panel</span>
            </div>
          ))}
          {interviewers.length === 0 && <p>No interview panel members registered yet.</p>}
        </div>
      )}
    </div>
  );
}