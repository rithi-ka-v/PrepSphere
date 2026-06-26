import { useState } from "react";
import API from "../services/api";

function ResumeUpload() {

  const [file,setFile] =
  useState(null);

  const handleUpload =
  async (e) => {

    e.preventDefault();

    const user =
    JSON.parse(
      localStorage.getItem("user")
    );

    const formData =
    new FormData();

    formData.append(
      "resume",
      file
    );

    formData.append(
      "userId",
      user.id
    );

    try {

      await API.post(
        "/resume/upload",
        formData
      );

      alert("Resume Uploaded");

    } catch(err) {

      console.log(err);

    }
  };

  return (
    <div className="container mt-5">

      <h2>Upload Resume</h2>

      <form onSubmit={handleUpload}>

        <input
          type="file"
          className="form-control"
          onChange={(e)=>
            setFile(
             e.target.files[0]
            )
          }
        />

        <button
          className="btn btn-primary mt-3"
        >
          Upload
        </button>

      </form>

    </div>
  );
}

export default ResumeUpload;