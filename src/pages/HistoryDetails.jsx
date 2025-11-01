// src/pages/HistoryDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/HistoryDetails.css";

export default function HistoryDetails() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/solar/all`);
        const result = await res.json();
        if (result.success) {
          const found = result.data.find((d) => d._id === id);
          setRecord(found);
        }
      } catch (err) {
        console.error("❌ Error fetching details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!record)
    return (
      <div className="dashboard-bg flex-center">
        <h2 className="dashboard-title glow">⚙️ Loading details...</h2>
      </div>
    );

  return (
    <div className="dashboard-bg">
      {/* 🌌 3D Star Background */}
      <Canvas className="three-bg">
        <color attach="background" args={["#000000"]} />
        <Stars radius={200} depth={60} count={4000} factor={4} fade />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      {/* 🌟 Content Overlay */}
      <div className="container-fluid text-center text-light py-5 px-3 content-overlay">
        <motion.h1
          className="dashboard-title mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌞 Recorded Solar Data Details
        </motion.h1>


        {/* 🔹 Stats Section */}
        <div className="row justify-content-center g-4 mb-5">
          {["angle", "voltage", "current", "temperature", "power"].map(
            (key, i) => (
              <motion.div
                className="col-12 col-sm-6 col-md-4 col-lg-2 stat-card p-3 mx-2"
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                <h5 className="fw-bold">{key.toUpperCase()}</h5>
                <h2 className="glow">
                  {record[key]}{" "}
                  {key === "angle"
                    ? "°"
                    : key === "voltage"
                    ? "V"
                    : key === "current"
                    ? "A"
                    : key === "temperature"
                    ? "°C"
                    : key === "power"
                    ? "W"
                    : ""}
                </h2>
              </motion.div>
            )
          )}
        </div>

        {/* 🔹 Circular Progress Bars */}
        <div className="row justify-content-center g-4 mb-5">
          {["dust", "efficiency", "intensity"].map((key, i) => (
            <motion.div
              className="col-10 col-sm-6 col-md-4 col-lg-3 stat-card py-4"
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.3 }}
            >
              <h5 className="fw-bold mb-3">{key.toUpperCase()}</h5>
              <div style={{ width: "70%", maxWidth: 150, margin: "auto" }}>
                <CircularProgressbar
                  value={record[key]}
                  text={`${record[key]}%`}
                  styles={buildStyles({
                    textColor: "#00ffcc",
                    pathColor:
                      key === "dust"
                        ? "#ff0066"
                        : key === "efficiency"
                        ? "#00ffcc"
                        : "#ffaa00",
                    trailColor: "#222",
                  })}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🧠 Suggestion Box */}
        <motion.div
          className="suggestion-box mx-auto mb-5"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h5 className="mb-0">{record.suggestion}</h5>
        </motion.div>

        {/* ⚠️ Alert Box */}
        {record.alert && (
          <motion.div
            className="alert-box mx-auto mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h5 className="mb-0 text-warning">{record.alert}</h5>
          </motion.div>
        )}

        {/* 🕓 Timestamp */}
        <motion.p
          className="timestamp text-center text-secondary mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🕓 Recorded at: {new Date(record.timestamp).toLocaleString()}
        </motion.p>



        
        {/* 🔙 Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="back-btn mb-5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ← Back to History
        </motion.button>
      </div>
    </div>
  );
}
