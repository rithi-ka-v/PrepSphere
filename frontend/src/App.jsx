import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ATSAnalyzer from "./pages/ATSAnalyzer";
import Interview from "./pages/Interview";
import InterviewResult from "./pages/InterviewResult";
import InterviewHistory from "./pages/InterviewHistory";

function App() {
  return (
    <BrowserRouter>
 <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/upload-resume" element={<ResumeUpload />} />
  <Route path="/ats" element={<ATSAnalyzer />} />
  <Route path="/interview" element={<Interview />} />
  <Route path="/interview-result" element={<InterviewResult />} />
  <Route path="/interview-history" element={<InterviewHistory />} />
</Routes>  
               
    
    </BrowserRouter>
  );
}

export default App;