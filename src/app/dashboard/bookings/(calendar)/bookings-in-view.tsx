'use client';
import BookingCard from '@/components/ui/booking-card';
import { useCalendarContext } from './context';

export function BookingsInView() {
  const { bookingsThisMonth } = useCalendarContext();
  const hasBookings = bookingsThisMonth.length !== 0;

  return (
    <div className="flex flex-col gap-3 p-6">
      {hasBookings &&
        bookingsThisMonth.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      {!hasBookings && (
        <p className="m-auto block text-center font-medium text-foreground">
          Inga bokningar denna månad
        </p>
      )}
    </div>
  );
}
