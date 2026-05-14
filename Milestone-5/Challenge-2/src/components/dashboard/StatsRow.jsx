import StatCard from "../shared/StatCard";

export default function StatsRow({
  totalCount,
  completedCount,
  progressPercent,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <StatCard label="Total Tasks" value={totalCount} />
      <StatCard label="Completed" value={completedCount} />
      <StatCard label="Remaining" value={totalCount - completedCount} />
      <StatCard label="Progress" value={`${progressPercent}%`} />
    </div>
  );
}