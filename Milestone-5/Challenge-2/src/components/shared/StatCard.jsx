export default function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "1px solid #2d2d44",
        borderRadius: 14,
        padding: "20px 24px",
      }}
    >
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
    </div>
  );
}