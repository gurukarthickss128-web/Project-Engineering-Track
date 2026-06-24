function SkeletonCard({ count = 4 }) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 border rounded-lg mb-4"
        >
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;