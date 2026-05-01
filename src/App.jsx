import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PostJob from "./pages/recruiter/PostJob";
import Dashboard from "./pages/applicant/Dashboard";
import ApplyJob from "./pages/applicant/ApplyJob";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard"; // Add this
import InterviewerDashboard from "./pages/interviewer/InterviewerDashboard"; // Add this
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/apply/:jobId" element={<ApplyJob />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Added Routes below */}
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/interviewer-dashboard" element={<InterviewerDashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;