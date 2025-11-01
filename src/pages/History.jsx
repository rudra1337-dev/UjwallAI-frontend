import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/History.css"; // 👈 We'll create this file below

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/solar/all");
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-bg d-flex align-items-center justify-content-center min-vh-100">
        <h2 className="dashboard-title glow">⚙️ Loading history...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-bg py-5">
      <div className="content-overlay container">
        <h1 className="dashboard-title text-center mb-5">📜 Solar Data History</h1>

        {data.length === 0 ? (
          <p className="text-center text-secondary">No records found 😔</p>
        ) : (
          <div className="row g-4">
            {data.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div
                  className="history-card p-3"
                  onClick={() => navigate(`/history/${item._id}`)}
                >
                  <div className="card-content">
                    <h5 className="text-glow mb-2">
                      🕒 {new Date(item.timestamp).toLocaleString()}
                    </h5>
                    <p className="m-0 text-light small">
                      ⚡ <strong>Power:</strong> {item.power} W
                    </p>
                    <p className="m-0 text-light small">
                      💡 <strong>Efficiency:</strong> {item.efficiency}%
                    </p>
                    <p className="mt-2 text-muted small fst-italic">
                      {item.suggestion?.slice(0, 45)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
