export const PostsLoading = () => {
  return (
    <div className="flex flex-col gap-6 overflow-hidden rounded-4xl bg-white p-6 pb-6 dark:bg-gray-950 animate-pulse">
      <div className="text-center">
        <div className="w-full bg-gray-100 rounded h-7"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-full bg-gray-100 rounded h-3"></div>
        <div className="w-full bg-gray-100 rounded h-3"></div>
        <div className="w-full bg-gray-100 rounded h-3"></div>
        <div className="w-full bg-gray-100 rounded h-3"></div>
      </div>
      <div className="mt-auto pt-8">
        <div className="w-full bg-gray-100 rounded h-3"></div>
      </div>
    </div>
  );
};
