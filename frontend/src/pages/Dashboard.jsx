import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/interviewAPI";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    atsScore: 0,
    interviewsTaken: 0,
    averageScore: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats(user.id);
      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3 className="text-center">Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        Welcome, {user.name}
      </h2>

      <div className="row">

        {/* ATS Score */}
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body text-center">
              <h5>ATS Score</h5>
              <h2>{stats.atsScore}</h2>
            </div>
          </div>
        </div>

        {/* Interviews */}
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h5>Interviews Taken</h5>
              <h2>{stats.interviewsTaken}</h2>
            </div>
          </div>
        </div>

        {/* Average */}
        <div className="col-md-4 mb-3">
          <div className="card text-dark bg-warning shadow">
            <div className="card-body text-center">
              <h5>Average Score</h5>
              <h2>{stats.averageScore}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row mt-4">

        <div className="col-md-3 mb-3">
          <Link
            to="/upload-resume"
            className="btn btn-success w-100"
          >
            Upload Resume
          </Link>
        </div>

        <div className="col-md-3 mb-3">
          <Link
            to="/ats"
            className="btn btn-info w-100 text-white"
          >
            ATS Analyzer
          </Link>
        </div>

        <div className="col-md-3 mb-3">
          <Link
            to="/interview"
            className="btn btn-warning w-100"
          >
            Mock Interview
          </Link>
        </div>

        <div className="col-md-3 mb-3">
          <Link
            to="/interview-history"
            className="btn btn-secondary w-100"
          >
            Interview History
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;