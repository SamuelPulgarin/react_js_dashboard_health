export const DashboardSkeleton = () => {
  return (
    <div className="mx-auto py-10 animate-pulse">
      <h1 className="text-2xl font-bold mb-6 bg-gray-300 h-6 w-48 rounded"></h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-300 h-10 w-full rounded"></div>
        <div className="bg-gray-300 h-10 w-full rounded"></div>
        <div className="bg-gray-300 h-10 w-full rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow h-[400px] flex flex-col justify-between"
          >
            <div className="bg-gray-300 h-6 w-2/3 rounded mb-4"></div>
            <div className="bg-gray-300 h-72 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
