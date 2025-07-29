const Loader = ({ count = 3, type = "card" }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-md bg-gray-200 ${
            type === "card" ? "h-32" : "h-16"
          } w-full`}
        >
          <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
        </div>
      ))}
    </div>
  );
};

export default Loader;
