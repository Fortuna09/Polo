export function ChartSkeleton() {
  return (
    <div className="bg-slate-800 p-4 rounded-lg animate-pulse">
      <div className="h-8 bg-slate-700 rounded w-1/3 mb-6"></div>

      <div className="flex items-end h-64 space-x-4">
        <div className="w-full bg-slate-700 rounded-t-md h-1/2"></div>
        <div className="w-full bg-slate-700 rounded-t-md h-3/4"></div>
        <div className="w-full bg-slate-700 rounded-t-md h-1/3"></div>
        <div className="w-full bg-slate-700 rounded-t-md h-5/6"></div>
        <div className="w-full bg-slate-700 rounded-t-md h-1/2"></div>
      </div>
    </div>
  );
}