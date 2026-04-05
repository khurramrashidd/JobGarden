import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { analyzeResumeWithGemini } from "../../services/geminiService";

const jobContext = {
  "1": ["AWS", "Cybersecurity", "Python"],
  "2": ["TensorFlow", "Gemini API", "Python"],
  "3": ["React", "Vite", "Firebase"]
};

function ApplyJob() {
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
    <div className="container" style={{ maxWidth: "700px" }}>
      <button className="btn btn-outline animate-in" onClick={() => navigate('/dashboard')} style={{ marginBottom: "2rem" }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="card animate-in" style={{ animationDelay: '0.1s' }}>
        <h2 style={{ fontSize: "1.8rem" }}>Submit Your Application</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Our ATS utilizes the <strong>gemini-3-flash-preview</strong> model to instantly evaluate your profile against the job requirements.
        </p>

        {!result ? (
          <form onSubmit={handleApply}>
            <div className="input-group" style={{ 
              border: "2px dashed var(--border)", 
              padding: "3rem 1rem", 
              borderRadius: "12px",
              textAlign: "center",
              background: "rgba(15,23,42,0.3)"
            }}>
              <UploadCloud size={48} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
              <input 
                type="file" 
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ border: "none", background: "transparent", padding: 0, width: "auto", margin: "0 auto" }}
              />
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                Name your file with relevant skills (e.g., "react_firebase_resume.pdf") to test the parsing engine.
              </p>
            </div>

            <button type="submit" className="btn" disabled={isAnalyzing} style={{ width: "100%", marginTop: "1.5rem", padding: "1rem" }}>
              {isAnalyzing ? "🤖 Parsing & Analyzing via Gemini..." : "Analyze & Submit Application"}
            </button>
          </form>
        ) : (
          <div className="animate-in" style={{ 
            marginTop: "1rem", 
            padding: "2rem", 
            background: "rgba(15, 23, 42, 0.6)", 
            borderRadius: "12px",
            borderLeft: `4px solid ${result.score >= 60 ? "#4ade80" : "#fbbf24"}`
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              {result.score >= 60 ? <CheckCircle2 size={32} color="#4ade80" /> : <AlertCircle size={32} color="#fbbf24" />}
              <div>
                <h3 style={{ margin: 0, fontSize: "1.5rem", color: result.score >= 60 ? "#4ade80" : "#fbbf24" }}>
                  ATS Match Score: {result.score}%
                </h3>
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Status: {result.recommendedAction}</span>
              </div>
            </div>
            
            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.5rem 0" }}>AI Feedback ({result.modelUsed})</h4>
              <p style={{ margin: 0, color: "var(--text-main)", lineHeight: 1.5 }}>{result.aiFeedback}</p>
            </div>
            
            <button className="btn btn-outline" onClick={() => navigate('/dashboard')} style={{ width: "100%", marginTop: "2rem" }}>
              Return to Job Board
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplyJob;