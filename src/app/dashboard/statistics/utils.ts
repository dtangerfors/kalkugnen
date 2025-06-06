import { SortedBooking, BookingData as Booking } from "@/lib/types";

function thisYear(booking: Booking) {
  const bookingCreated = new Date(booking.arrival).getFullYear();
  const thisYear = new Date().getFullYear();
  return bookingCreated == thisYear;
}

function previousYear(booking: Booking) {
  const bookingCreated = new Date(booking.arrival).getFullYear();
  const previousYear = new Date().getFullYear() - 1;
  return bookingCreated == previousYear;
}

function getTotalGuestsThisYear(bookings: Booking[]) {
  let guests = 0;
  const bookingsThisYear = bookings.filter(thisYear);

  bookingsThisYear.forEach(booking => guests += booking.guests);

  return guests;
}

function getTotalDaysThisYear(bookings: Booking[]) {
  let totalDaysThisYear = 0;
  const bookingsThisYear = bookings.filter(thisYear);

  bookingsThisYear.forEach(booking => {
    const travel_dates = {start: booking.arrival.toString(), end: booking.departure.toString()};
    const daysForThisBooking = totalDays(travel_dates!.start, travel_dates!.end)

    totalDaysThisYear += daysForThisBooking
  })

  return totalDaysThisYear;
}

function totalDays(arrival: string, departure: string) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(arrival).valueOf();
  const secondDate = new Date(departure).valueOf();

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

function sortBookingsByYear(bookings: Booking[]) {
  const bookingsByYear: SortedBooking = {};

  bookings.forEach((booking) => {
    const travel_dates = {start: booking.arrival.toString(), end: booking.departure.toString()};
    const year = new Date(travel_dates.start).getFullYear();

    if (!bookingsByYear[year]) {
      bookingsByYear[year] = [];
    }

    bookingsByYear[year].push(booking);
  });

  return { bookingsByYear };
}

export const generateYAxis = (bookings: Booking[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const { bookingsByYear } = sortBookingsByYear(bookings);
  const highestRecord = Math.max(...Object.values(bookingsByYear).map(year => year.length));
  const topLabel = highestRecord;

  for (let i = 0; i <= topLabel; i++) {
    yAxisLabels.push(`${i} st`);
  }

  return { yAxisLabels, topLabel };
};

export {thisYear, previousYear, getTotalGuestsThisYear, getTotalDaysThisYear, sortBookingsByYear} 