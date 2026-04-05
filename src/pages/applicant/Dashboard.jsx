import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Zap } from "lucide-react";
import SearchModal from "../../components/SearchModal";

const INITIAL_JOBS = [
  { id: "1", title: "Cloud Security Engineer", company: "CyberGuard Tech", description: "Design secure cloud architectures and implement robust cybersecurity protocols.", skills: ["AWS", "Cybersecurity", "Python"] },
  { id: "2", title: "AI/ML Developer", company: "DataMinds Inc", description: "Build generative AI models and optimize large language models for enterprise solutions.", skills: ["TensorFlow", "Gemini API", "Python"] },
  { id: "3", title: "Full Stack Web Developer", company: "WebFlow Solutions", description: "Develop highly responsive web applications using modern frontend tooling.", skills: ["React", "Vite", "Firebase"] },
];

function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="container">
      <nav className="navbar animate-in">
        <div className="navbar-brand">🌱 JobGarden</div>
        <button className="btn btn-outline" onClick={() => setIsSearchOpen(true)}>
          <Search size={18} /> Global Search
        </button>
      </nav>

      <div className="animate-in" style={{ animationDelay: '0.1s' }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Find Your Next Role</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px" }}>
          Leverage our advanced ATS and AI integration to match your resume with the perfect opportunity.
        </p>
      </div>

      <div className="job-grid">
        {INITIAL_JOBS.map((job, index) => (
          <div key={job.id} className="card animate-in" style={{ animationDelay: `${(index + 2) * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ padding: "0.75rem", background: "rgba(99,102,241,0.1)", borderRadius: "12px" }}>
                <Briefcase size={24} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.2rem" }}>{job.title}</h3>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{job.company}</span>
              </div>
            </div>
            
            <p style={{ color: "var(--text-main)", fontSize: "0.95rem", flex: 1 }}>{job.description}</p>
            
            <div className="badges">
              {job.skills.map(skill => <span key={skill} className="badge">{skill}</span>)}
            </div>

            <Link to={`/apply/${job.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <button className="btn" style={{ width: "100%" }}>
                <Zap size={18} /> Apply with AI Match
              </button>
            </Link>
          </div>
        ))}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default Dashboard;