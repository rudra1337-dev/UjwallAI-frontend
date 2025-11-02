import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import { createGlobalStyle } from "styled-components";

// 🎵 Local alert sound
import alertSound from "../assets/alert.mp3";

// 🎨 Global Style (CSS merged here)
const GlobalStyle = createGlobalStyle`
  /* ⚡ AlertOverlay Styles — Realistic Holographic Emergency Effect */

  .alert-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    background: radial-gradient(circle at center, rgba(255, 90, 0, 0.25), rgba(50, 0, 0, 0.85));
    border: 2px solid rgba(255, 100, 0, 0.7);
    border-radius: 25px;
    box-shadow: 0 0 50px rgba(255, 90, 0, 0.9);
    z-index: 9999;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(15px) saturate(1.5);
    animation: flickerBg 2s infinite alternate;
  }

  @keyframes flickerBg {
    from {
      box-shadow: 0 0 25px rgba(255, 80, 0, 0.6);
    }
    to {
      box-shadow: 0 0 60px rgba(255, 130, 0, 1);
    }
  }

  .alert-canvas {
    position: absolute !important;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .alert-content {
    z-index: 5;
    color: #fff;
    text-shadow: 0 0 25px orange;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 25px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 90, 0, 0.3);
  }

  .glow-text {
    color: #ff9900;
    font-weight: 700;
    font-size: 2rem;
    animation: glowPulse 1.2s infinite alternate;
  }

  .danger-icon {
    font-size: 5.5rem;
    color: #ff6600;
    filter: drop-shadow(0 0 35px orange);
  }

  .stop-btn {
    font-size: 1.1rem;
    letter-spacing: 1px;
    background: linear-gradient(90deg, #ff6600, #ff3300);
    color: #fff;
    border: none;
    transition: all 0.3s ease;
  }

  .stop-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px #ff6600;
  }

  @keyframes glowPulse {
    from {
      text-shadow: 0 0 20px orange;
    }
    to {
      text-shadow: 0 0 50px #ff3300;
    }
  }

  /* 📱 Responsive */
  @media (max-width: 768px) {
    .alert-overlay {
      width: 95vw;
      height: 70vh;
    }
    .alert-message {
      font-size: 1.3rem;
    }
    .danger-icon {
      font-size: 4.2rem;
    }
  }
`;

export default function AlertOverlay({
  message = "🚨 SYSTEM ALERT: CRITICAL FAILURE DETECTED!",
  onClose,
}) {
  const audioRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Autoplay blocked"));
    }
  }, []);

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <>
      <GlobalStyle />
      <div className="alert-overlay d-flex align-items-center justify-content-center">
        {/* 🔊 Local alert sound */}
        <audio ref={audioRef} loop src={alertSound} />

        {/* 🌌 3D Animated Background */}
        <Canvas className="alert-canvas">
          <color attach="background" args={["#2b0000"]} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 3]} color="orange" intensity={3.5} />
          <Sphere args={[1.8, 64, 64]}>
            <meshStandardMaterial
              emissive="orange"
              emissiveIntensity={4}
              color="#ff5500"
              roughness={0.3}
              metalness={0.9}
            />
          </Sphere>
        </Canvas>

        {/* 🚨 Alert UI */}
        <motion.div
          className="alert-content text-center p-4"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="danger-icon mb-4"
            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ⚠️
          </motion.div>

          <h2 className="alert-message glow-text mb-4">{message}</h2>

          <motion.button
            className="btn btn-warning px-5 py-2 fw-bold rounded-pill shadow-lg stop-btn"
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px #ff6600" }}
            onClick={handleStop}
          >
            🛑 DEACTIVATE ALERT
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
