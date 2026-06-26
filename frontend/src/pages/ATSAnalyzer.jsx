import { useState } from "react";
import API from "../services/api";

function ATSAnalyzer() {
  const [resumeId, setResumeId] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await API.post(
        "/ats/analyze",
        {
          resumeId,
        }
      );

      setResult(response.data);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Analysis Failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2>ATS Resume Analyzer</h2>

        <input
          type="number"
          className="form-control mt-3"
          placeholder="Enter Resume ID"
          value={resumeId}
          onChange={(e) =>
            setResumeId(e.target.value)
          }
        />

        <button
          className="btn btn-success mt-3"
          onClick={handleAnalyze}
        >
          Analyze Resume
        </button>

        {result && (
          <div className="mt-4">

            <h3>
              ATS Score:
              {result.atsScore}/100
            </h3>

            <p>
              {result.feedback}
            </p>

            <h5>
              Skills Found
            </h5>

            <ul>
              {result.foundSkills.map(
                (skill, index) => (
                  <li key={index}>
                    {skill}
                  </li>
                )
              )}
            </ul>

          </div>
        )}

      </div>

    </div>
  );
}

export default ATSAnalyzer;