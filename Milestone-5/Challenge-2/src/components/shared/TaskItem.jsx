export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 12,
        border: "1px solid #2d2d44",
        marginBottom: 8,
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          style={{
            marginLeft: 10,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </span>
      </div>

      <button onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
}