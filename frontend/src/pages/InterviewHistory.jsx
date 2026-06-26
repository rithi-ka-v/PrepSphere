import { useEffect, useState } from "react";
import { getInterviewHistory } from "../services/interviewAPI";

function InterviewHistory() {

  const [history, setHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {

    try {

      const res = await getInterviewHistory(user.id);

      setHistory(res.data);

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Interview History
        </h2>

        {
          history.length === 0 ? (

            <div className="alert alert-warning">
              No Interview History Found
            </div>

          ) : (

            <table className="table table-bordered table-hover">

              <thead className="table-dark">

                <tr>

                  <th>#</th>

                  <th>Role</th>

                  <th>Score</th>

                  <th>Percentage</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {

                  history.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>{item.role}</td>

                      <td>{item.score}/5</td>

                      <td>{Math.round((item.score / 5) * 100)}%</td>

                      <td>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          )

        }

      </div>

    </div>

  );

}

export default InterviewHistory;