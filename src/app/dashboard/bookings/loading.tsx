import { BookingEventSkeleton, CalendarSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="@container">
      <div className="flex flex-col @4xl:grid @4xl:grid-cols-3 w-full gap-6">
        <CalendarSkeleton />
        <div className="@container relative grow bg-background p-6">
          <BookingEventSkeleton />
        </div>
      </div>
    </div>
  );
}
