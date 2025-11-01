import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "../styles/Home.css"; // ✅ make sure this file path is correct

export default function Home() {
  const [solarData, setSolarData] = useState({
    angle: 0,
    voltage: 0,
    current: 0,
    dust: 0,
    intensity: 0,
    temperature: 0,
    power: 0,
    efficiency: 0,
    suggestion: "Loading...",
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    socket.on("solarData", (data) => {
      setSolarData(data);
      setChartData((prev) => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          voltage: data.voltage,
          current: data.current,
          power: data.power,
          efficiency: data.efficiency,
          temperature: data.temperature,
        },
      ]);
    });
    return () => socket.off("solarData");
  }, []);

  return (
    <div className="dashboard-bg">
      {/* 🌌 3D Star Background */}
      <Canvas className="three-bg">
        <color attach="background" args={["#000000"]} />
        <Stars radius={200} depth={60} count={4000} factor={4} fade />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      {/* 🌟 Main Dashboard Content */}
      <div className="container-fluid text-center text-light py-4 px-3 content-overlay">
        <motion.h1
          className="dashboard-title mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ⚡ Solar Intelligence Monitoring Center
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
                <h2 className="glow">{solarData[key]}</h2>
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
                  value={solarData[key]}
                  text={`${solarData[key]}%`}
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



        

        {/* 🔹 Suggestion Box */}
        <motion.div
          className="suggestion-box mx-auto mb-5"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h5 className="mb-0">{solarData.suggestion}</h5>
        </motion.div>




{/* ⚠️ Alert Box */}
{solarData.alert && (
  <motion.div
    className="alert-box mx-auto mb-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h5 className="mb-0 text-warning">{solarData.alert}</h5>
  </motion.div>
)}




        {/* 🔹 Line Charts */}
        <div className="chart-grid container-fluid">
          {[
            { key: "voltage", color: "#00ffff" },
            { key: "current", color: "#ff3366" },
            { key: "power", color: "#ffaa00" },
            { key: "efficiency", color: "#00ff99" },
            { key: "temperature", color: "#ff6600" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="chart-box"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.3 }}
            >
              <h5 className="mb-3">{item.key.toUpperCase()} Over Time</h5>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="time" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={item.key}
                    stroke={item.color}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                    animationDuration={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
