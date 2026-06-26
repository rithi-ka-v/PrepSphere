import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ATSAnalyzer from "./pages/ATSAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/resume" element={<ResumeUpload />} />
               <Route path="/ats" element={<ATSAnalyzer />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;