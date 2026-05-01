import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, UploadCloud, CheckCircle2, AlertCircle, FileText, Loader2 } from "lucide-react";
import { analyzeResumeWithGemini } from "../../services/geminiService";

const jobContext = {
  "1": ["AWS", "Cybersecurity", "Python"],
  "2": ["TensorFlow", "Gemini API", "Python"],
  "3": ["React", "Vite", "Firebase"]
};

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a resume file.");

    setIsAnalyzing(true);
    try {
      const skillsToMatch = jobContext[jobId] || ["General"];
      const analysis = await analyzeResumeWithGemini(file.name, skillsToMatch);
      setResult(analysis);
    } catch (err) {
      alert("Error analyzing resume: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: "750px", padding: "2rem 1rem" }}>
      <button 
        className="btn btn-outline animate-in" 
        onClick={() => navigate('/dashboard')} 
        style={{ marginBottom: "2rem", display: "inline-flex", gap: "0.5rem" }}
        aria-label="Go back to Dashboard"
      >
        <ArrowLeft size={18} aria-hidden="true" /> Back to Jobs
      </button>

      <section className="card animate-in" style={{ animationDelay: '0.1s' }}>
        <header style={{ borderBottom: "1px solid var(--border-solid)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Submit Your Application</h1>
          <p style={{ color: "var(--text-muted)", margin: 0 }}>
            Our ATS utilizes the <strong>gemini-3-flash-preview</strong> model to evaluate your profile against job requirements instantly.
          </p>
        </header>

        {!result ? (
          <form onSubmit={handleApply}>
            {/* Interactive Upload Zone */}
            <div 
              style={{ 
                border: file ? "2px solid var(--primary)" : "2px dashed var(--border-solid)", 
                padding: "3rem 1.5rem", 
                borderRadius: "12px",
                textAlign: "center",
                background: file ? "rgba(170, 59, 255, 0.05)" : "var(--bg)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <input 
                type="file" 
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ 
                  position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
                  opacity: 0, cursor: "pointer" 
                }}
                aria-label="Upload resume document"
              />
              
              {file ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                  <FileText size={48} color="var(--primary)" />
                  <span style={{ fontWeight: "600", color: "var(--text-main)" }}>{file.name}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Ready for analysis</span>
                </div>
              ) : (
                <>
                  <UploadCloud size={48} color="var(--text-muted)" style={{ margin: "0 auto 1rem auto" }} />
                  <p style={{ fontWeight: "500", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>Click or drag file to this area to upload</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Supports PDF or DOCX</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "1rem" }}>
                    *Tip: Name your file with relevant skills (e.g., "react_firebase_resume.pdf") for the simulation.
                  </p>
                </>
              )}
            </div>

            <button 
              type="submit" 
              className="btn" 
              disabled={isAnalyzing || !file} 
              style={{ width: "100%", marginTop: "2rem", padding: "1rem", fontSize: "1.05rem" }}
            >
              {isAnalyzing ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                  <Loader2 className="lucide-spin" size={20} /> Analyzing via Gemini...
                </span>
              ) : "Analyze & Submit Application"}
            </button>
          </form>
        ) : (
          <div className="animate-in" style={{ 
            padding: "2rem", 
            background: "var(--bg)", 
            borderRadius: "12px",
            borderLeft: `5px solid ${result.score >= 60 ? "#10b981" : "#f59e0b"}`
          }}>
            <header style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              {result.score >= 60 ? <CheckCircle2 size={40} color="#10b981" /> : <AlertCircle size={40} color="#f59e0b" />}
              <div>
                <h2 style={{ margin: 0, fontSize: "1.5rem", color: result.score >= 60 ? "#10b981" : "#f59e0b" }}>
                  ATS Match Score: {result.score}%
                </h2>
                <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: "500" }}>
                  Recommendation: {result.recommendedAction}
                </span>
              </div>
            </header>
            
            <div style={{ background: "var(--surface-solid)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-solid)" }}>
              <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                AI Feedback <span className="badge" style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}>{result.modelUsed}</span>
              </h3>
              <p style={{ margin: 0, color: "var(--text-main)", lineHeight: 1.6 }}>{result.aiFeedback}</p>
              
              {result.extractedSkills?.length > 0 && (
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-solid)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.5rem" }}>Matched Keywords:</span>
                  <div className="badges" style={{ margin: 0 }}>
                    {result.extractedSkills.map(s => <span key={s} className="badge">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
            
            <button className="btn btn-outline" onClick={() => navigate('/dashboard')} style={{ width: "100%", marginTop: "2rem", padding: "0.875rem" }}>
              Return to Job Board
            </button>
          </div>
        )}
      </section>
    </main>
  );
}