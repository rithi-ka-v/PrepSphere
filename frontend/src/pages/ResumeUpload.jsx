import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ResumeUpload() {

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleUpload = async (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("userId", user.id);

    try {

      const response = await API.post(
        "/resume/upload",
        formData
      );

      alert("Resume Uploaded Successfully");

      // Redirect to ATS page with resume ID
      navigate("/ats", {
        state: {
          resumeId: response.data.id
        }
      });

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2>Upload Resume</h2>

        <form onSubmit={handleUpload}>

          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            required
          />

          <button
            className="btn btn-primary mt-3"
          >
            Upload Resume
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResumeUpload;