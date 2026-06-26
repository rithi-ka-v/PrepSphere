import { useState } from "react";
import { startInterview, submitInterview } from "../services/interviewAPI";

function Interview() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [role, setRole] = useState("MERN");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [interviewId, setInterviewId] = useState(null);
  const [result, setResult] = useState(null);

  const handleStart = async () => {
    try {
      const res = await startInterview({
        userId: user.id,
        role,
      });

      setInterviewId(res.data.interviewId);
      setQuestions(res.data.questions);
      setAnswers(new Array(res.data.questions.length).fill(""));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAnswer = (e) => {
    const temp = [...answers];
    temp[current] = e.target.value;
    setAnswers(temp);
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
  };

  const finishInterview = async () => {
    try {
      const res = await submitInterview({
        interviewId,
        role,
        answers,
      });

      setResult(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (result) {
    return (
      <div className="container mt-5">
        <div className="card p-4 shadow">

          <h2>Interview Completed</h2>

          <h4>
            Score : {result.score}/{result.total}
          </h4>

          <h4>
            Percentage :
            {Math.round((result.score / result.total) * 100)}%
          </h4>

        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mt-5">

        <div className="card p-4 shadow">

          <h2>Mock Interview</h2>

          <select
            className="form-select mt-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>MERN</option>
            <option>Java</option>
          </select>

          <button
            className="btn btn-primary mt-3"
            onClick={handleStart}
          >
            Start Interview
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h4>
          Question {current + 1} / {questions.length}
        </h4>

        <h5 className="mt-3">
          {questions[current].question}
        </h5>

        <textarea
          rows="5"
          className="form-control mt-3"
          value={answers[current]}
          onChange={handleAnswer}
        />

        {current < questions.length - 1 ? (
          <button
            className="btn btn-success mt-3"
            onClick={nextQuestion}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-danger mt-3"
            onClick={finishInterview}
          >
            Finish Interview
          </button>
        )}

      </div>

    </div>
  );
}

export default Interview;