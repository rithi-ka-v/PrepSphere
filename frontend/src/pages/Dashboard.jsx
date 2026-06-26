import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2>
            Welcome {user?.name}
          </h2>

          <hr />

          <h4>PrepSphere Dashboard</h4>

          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-3">
                <h5>Interviews Taken</h5>
                <h2>0</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <h5>Resume Score</h5>
                <h2>N/A</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <h5>Skill Gaps</h5>
                <h2>0</h2>
              </div>
            </div>
            <Link
              to="/resume"
              className="btn btn-primary mt-3"
            >
               Upload Resume
            </Link>
            <Link
               to="/ats"
               className="btn btn-success ms-2"
            >
                ATS Analyzer
           </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;