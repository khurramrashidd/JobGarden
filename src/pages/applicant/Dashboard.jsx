import { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Zap, MapPin, Clock, ChevronRight } from "lucide-react";

// Mock Data: Enhanced with location and type for a richer UI experience 
// without altering the underlying ATS matching logic.
const INITIAL_JOBS = [
  { 
    id: "1", 
    title: "Cloud Security Engineer", 
    company: "CyberGuard Tech", 
    location: "Remote",
    type: "Full-time",
    description: "Design secure cloud architectures and implement robust cybersecurity protocols.", 
    skills: ["AWS", "Cybersecurity", "Python"] 
  },
  { 
    id: "2", 
    title: "AI/ML Developer", 
    company: "DataMinds Inc", 
    location: "Hybrid - Mumbai",
    type: "Contract",
    description: "Build generative AI models and optimize large language models for enterprise solutions.", 
    skills: ["TensorFlow", "Gemini API", "Python"] 
  },
  { 
    id: "3", 
    title: "Full Stack Web Developer", 
    company: "WebFlow Solutions", 
    location: "On-site - Bangalore",
    type: "Full-time",
    description: "Develop highly responsive web applications using modern frontend tooling.", 
    skills: ["React", "Vite", "Firebase"] 
  },
];

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <main className="container animate-fade-in" aria-label="Applicant Dashboard">
      {/* Hero Section */}
      <header style={{ marginBottom: "3rem", textAlign: "center", padding: "2rem 0" }}>
        <h1 style={{ 
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
          fontWeight: "800",
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
          background: "linear-gradient(135deg, var(--primary) 0%, #c084fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Find Your Next Role
        </h1>
        <p style={{ 
          color: "var(--text-muted)", 
          fontSize: "clamp(1rem, 2vw, 1.15rem)", 
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          Leverage our advanced ATS and AI integration to match your resume with the perfect opportunity.
        </p>
      </header>

      {/* Job Listings Grid */}
      <section aria-label="Available Job Postings">
        <div className="job-grid">
          {INITIAL_JOBS.map((job, index) => (
            <article 
              key={job.id} 
              className="card animate-in" 
              style={{ 
                animationDelay: `${(index + 1) * 0.1}s`, 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transform: hoveredCard === job.id ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredCard === job.id ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'var(--shadow)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={() => setHoveredCard(job.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ 
                  padding: "0.85rem", 
                  background: "rgba(170, 59, 255, 0.1)", 
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Briefcase size={26} color="var(--primary)" aria-hidden="true" />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 0.35rem 0", fontSize: "1.25rem", fontWeight: "700" }}>
                    {job.title}
                  </h3>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: "500" }}>
                    {job.company}
                  </span>
                </div>
              </div>
              
              {/* Meta Info (Location & Type) */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <MapPin size={14} aria-hidden="true" /> {job.location}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Clock size={14} aria-hidden="true" /> {job.type}
                </span>
              </div>
              
              {/* Description */}
              <p style={{ color: "var(--text-main)", fontSize: "0.95rem", flex: 1, marginBottom: "1.5rem", lineHeight: "1.6" }}>
                {job.description}
              </p>
              
              {/* Skills Badges */}
              <div className="badges" aria-label="Required Skills" style={{ marginBottom: "1.5rem" }}>
                {job.skills.map(skill => (
                  <span key={skill} className="badge">{skill}</span>
                ))}
              </div>

              {/* Call to Action */}
              <Link 
                to={`/apply/${job.id}`} 
                style={{ textDecoration: 'none', width: '100%', marginTop: 'auto' }}
                aria-label={`Apply for ${job.title} at ${job.company}`}
              >
                <button 
                  className="btn" 
                  style={{ 
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    fontSize: "1rem"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Zap size={18} aria-hidden="true" /> Apply with AI Match
                  </span>
                  <ChevronRight size={18} aria-hidden="true" style={{
                    transform: hoveredCard === job.id ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease'
                  }}/>
                </button>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}