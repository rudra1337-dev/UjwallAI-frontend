// 💡 src/components/StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "8px",
      minWidth: "120px",
      textAlign: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
