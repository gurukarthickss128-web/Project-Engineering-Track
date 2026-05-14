import TaskItem from "../shared/TaskItem";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <div>
      {tasks.length === 0 && <p>No tasks found</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}