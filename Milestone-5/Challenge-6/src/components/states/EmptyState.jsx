function EmptyState({
  title,
  message,
  actionLabel,
  onAction
}) {
  return (
    <div className="text-center p-10">
      <h1 className="text-6xl mb-4">📭</h1>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mb-5">
        {message}
      </p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;