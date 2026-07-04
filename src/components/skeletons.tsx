export function CalendarSkeleton() {
  return (
    <div className="w-full h-[30rem] animate-pulse rounded-3xl m-6 @4xl:mr-0">
      <div className="mb-4 flex justify-between">
        <span className="flex gap-1">
          <span className="rounded-3xl bg-gray-100 w-14 h-9"></span>
          <span className="rounded-3xl bg-gray-100 w-14 h-9"></span>
          <span className="rounded-3xl bg-gray-100 w-14 h-9"></span>
        </span>
        <span className="w-14 h-4 bg-gray-100 rounded"></span>
      </div>
      <div className="rounded-3xl h-[25.25rem] bg-gray-100 mt-6"></div>
    </div>
  )
}

export function BookingEventSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full @lg:grid @lg:grid-cols-2 @3xl:grid-cols-3">
      <div className="h-20 rounded-lg bg-gray-100 animate-pulse"></div>
      <div className="h-20 rounded-lg bg-gray-100 animate-pulse"></div>
      <div className="h-20 rounded-lg bg-gray-100 animate-pulse"></div>
    </div>
  )
}

export function StatisticsSkeleton() {
  return (
    <div className="animate-pulse">
      <header className="bg-primary pt-safe-top">
        <div className="p-6 pb-10 flex items-end">
          <span className="h-9 w-40 rounded bg-white/30"></span>
        </div>
      </header>
      <div className="relative bg-primary px-6 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-2xl bg-white p-3">
              <span className="h-5 w-24 rounded bg-gray-100"></span>
              <span className="h-8 w-16 rounded bg-gray-100"></span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-[2]">
        <div className="bg-background h-6 rounded-t-3xl -mt-6"></div>
        <div className="bg-background p-6 pt-0 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-gray-100"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6 max-lg:pb-[6.5rem] animate-pulse">
      <div className="h-40 w-full rounded-3xl bg-gray-100"></div>
      <div className="flex flex-col gap-3">
        <div className="h-24 w-full rounded-2xl bg-gray-100"></div>
        <div className="h-24 w-full rounded-2xl bg-gray-100"></div>
        <div className="h-24 w-full rounded-2xl bg-gray-100"></div>
      </div>
    </div>
  )
}