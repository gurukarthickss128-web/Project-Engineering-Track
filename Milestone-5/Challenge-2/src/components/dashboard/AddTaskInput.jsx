export default function AddTaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div
      style={{
        background: "#1a1a2e",
        padding: 20,
        borderRadius: 14,
        marginBottom: 24,
      }}
    >
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="What needs to get done?"
        style={{ padding: 10, width: "70%" }}
      />

      <button onClick={addTask} style={{ marginLeft: 10 }}>
        + Add Task
      </button>
    </div>
  );
}