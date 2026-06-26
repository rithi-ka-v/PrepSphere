import { useLocation, useNavigate } from "react-router-dom";

function InterviewResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  if (!result) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          No Interview Result Found
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard")}
        >
          Go Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Interview Result
        </h2>

        <div className="row text-center">

          <div className="col-md-4">
            <div className="card p-3 bg-success text-white">
              <h5>Score</h5>
              <h2>
                {result.score}/{result.total}
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 bg-primary text-white">
              <h5>Percentage</h5>
              <h2>{result.percentage}%</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 bg-warning">
              <h5>Status</h5>

              <h2>
                {result.percentage >= 70
                  ? "Pass"
                  : "Practice More"}
              </h2>

            </div>
          </div>

        </div>

        <hr />

        <h3 className="mt-4">
          Question Feedback
        </h3>

        {result.results.map((item, index) => (

          <div
            key={index}
            className="card mt-3 p-3"
          >

            <h5>
              {index + 1}. {item.question}
            </h5>

            <p>
              <strong>Your Answer:</strong>
              <br />
              {item.userAnswer}
            </p>

            <p>
              <strong>Correct Answer:</strong>
              <br />
              {item.correctAnswer}
            </p>

            <h6
              className={
                item.marks === 1
                  ? "text-success"
                  : "text-danger"
              }
            >
              {item.feedback}
            </h6>

          </div>

        ))}

        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Back To Dashboard
        </button>

      </div>

    </div>
  );
}

export default InterviewResult;