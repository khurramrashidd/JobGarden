import { useState } from "react";

const MOCK_RESULTS = [
  { id: 101, title: "Frontend Developer", company: "TechCorp", location: "Mumbai" },
  { id: 102, title: "React Native Engineer", company: "AppMakers", location: "Remote" },
  { id: 103, title: "UI/UX Designer", company: "CreativeStudio", location: "Delhi" },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const filtered = MOCK_RESULTS.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.location.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSearched(true);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 style={{ marginTop: 0 }}>Internal Job Search</h2>
        <p style={{ color: "var(--text-muted)" }}>Find specific roles within the JobGarden network.</p>
        
        <form onSubmit={handleSearch} style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <input 
            type="text" 
            placeholder="e.g., React Developer in Mumbai" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ flex: 1, margin: 0 }}
          />
          <button type="submit" className="btn">Search</button>
        </form>

        <div style={{ marginTop: "1.5rem" }}>
          {searched && results.length === 0 && (
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>No results found for "{query}".</p>
          )}
          {results.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {results.map(job => (
                <li key={job.id} style={{ padding: "1rem", border: "1px solid var(--border)", borderRadius: "8px", marginBottom: "0.5rem" }}>
                  <h4 style={{ margin: "0 0 0.25rem 0" }}>{job.title}</h4>
                  <small style={{ color: "var(--text-muted)" }}>{job.company} • {job.location}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}