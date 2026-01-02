const SkeletonProductCard = () => (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden h-full animate-pulse border border-gray-100">
      <div className="relative w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center rounded-t-2xl">
        {/* Skeleton for image */}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div> {/* Skeleton for title */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div> {/* Skeleton for price */}
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div> {/* Skeleton for stock info */}
        <div className="mt-auto h-10 bg-gray-200 rounded-lg w-full"></div> {/* Skeleton for button */}
      </div>
    </div>
  );
  export default SkeletonProductCard;