function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center p-10">
      <h1 className="text-5xl mb-4">😵</h1>

      <h2 className="text-xl font-bold">
        Something went wrong
      </h2>

      <p className="text-gray-500 mb-5">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;