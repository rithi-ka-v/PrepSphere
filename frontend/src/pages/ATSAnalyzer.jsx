import { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

function ATSAnalyzer() {

  const location = useLocation();

  const [resumeId, setResumeId] = useState(
    location.state?.resumeId || ""
  );

  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {

    try {

      const response = await API.post(
        "/ats/analyze",
        {
          resumeId
        }
      );

      setResult(response.data);

    } catch (err) {

      console.log(err);

      alert("Analysis Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2>ATS Resume Analyzer</h2>

        <input
          type="number"
          className="form-control mt-3"
          value={resumeId}
          onChange={(e) =>
            setResumeId(e.target.value)
          }
          placeholder="Resume ID"
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
              ATS Score: {result.atsScore}/100
            </h3>

            <h5>{result.feedback}</h5>

            <hr />

            <h4>Skills Found</h4>

            <ul>

              {result.foundSkills.map((skill, index) => (

                <li key={index}>
                  {skill}
                </li>

              ))}

            </ul>

          </div>

        )}

      </div>

    </div>

  );

}

export default ATSAnalyzer;