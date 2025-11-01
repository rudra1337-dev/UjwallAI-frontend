// 📊 src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import StatsCard from "./StatsCard";

export default function Dashboard() {
  const [solarData, setSolarData] = useState({
    angle: 0,
    temperature: 0,
    voltage: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    // ⚡ Listen for live data from backend
    socket.on("solarData", (data) => {
      setSolarData({
        angle: data.angle,
        temperature: data.temperature,
        voltage: data.voltage,
        left: data.left,
        right: data.right,
      });
    });

    // 🧹 Cleanup on unmount
    return () => socket.off("solarData");
  }, []);

  return (
    <div className="dashboard">
      <h2>🌞 Solar Panel Monitoring Dashboard</h2>

      <div className="stats-grid">
        <StatsCard title="Angle" value={`${solarData.angle}°`} />
        <StatsCard title="Temperature" value={`${solarData.temperature}°C`} />
        <StatsCard title="Voltage" value={`${solarData.voltage}V`} />
        <StatsCard title="Left Motor" value={solarData.left} />
        <StatsCard title="Right Motor" value={solarData.right} />
      </div>
    </div>
  );
}
