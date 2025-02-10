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