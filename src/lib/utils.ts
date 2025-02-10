import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BookingData, SortedBooking } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sortBookingsByYear(bookings: BookingData[]) {
  const groupedBookings: SortedBooking = {};

  bookings.forEach((booking) => {
    const year = new Date(booking.arrival).getFullYear();

    if (!groupedBookings[year]) {
      groupedBookings[year] = [];
    }

    groupedBookings[year].push(booking);
  });

  return groupedBookings;
}

export async function groupBookingsByMonth(bookings: BookingData[]): Promise<Record<string, BookingData[]>> {
  return bookings.reduce(function (acc: Record<string, BookingData[]>, booking: BookingData): Record<string, BookingData[]> {
    const arrivalDate = new Date(booking.arrival);
    const departureDate = new Date(booking.departure);

    // Compute the total length of stay in milliseconds
    const totalStay = departureDate.getTime() - arrivalDate.getTime();
    if (totalStay <= 0) {
      throw new Error(`Invalid booking dates`);
    }

    // Get arrival and departure months
    const arrivalMonthKey = `${arrivalDate.getFullYear()}-${String(arrivalDate.getMonth() + 1).padStart(2, "0")}`;
    const departureMonthKey = `${departureDate.getFullYear()}-${String(departureDate.getMonth() + 1).padStart(2, "0")}`;

    // Calculate the time spent in each month
    const startOfDepartureMonth = new Date(departureDate.getFullYear(), departureDate.getMonth(), 1);
    const endOfArrivalMonth = new Date(arrivalDate.getFullYear(), arrivalDate.getMonth() + 1, 0);

    const timeInArrivalMonth = Math.min(totalStay, endOfArrivalMonth.getTime() - arrivalDate.getTime());
    const timeInDepartureMonth = Math.min(totalStay, departureDate.getTime() - startOfDepartureMonth.getTime());

    // Determine the month with the majority of the stay
    const majorityMonthKey = timeInArrivalMonth >= timeInDepartureMonth ? arrivalMonthKey : departureMonthKey;

    // Initialize the group if it doesn't exist
    if (!acc[majorityMonthKey]) {
      acc[majorityMonthKey] = [];
    }

    // Add the booking to the selected month
    acc[majorityMonthKey].push(booking);

    return acc;
  }, {});
}

export function getMonthTitle(monthKey: string): string {
  const [year, month] = monthKey.split("-").map(Number);

  // Array of month names in Swedish
  const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December"
  ];

  // Get the month name and ensure it's valid
  const monthName = monthNames[month - 1];
  if (!monthName) {
    throw new Error(`Invalid month key: ${monthKey}`);
  }

  // Return the formatted title
  return `${monthName} ${year}`;
}

export function getBookingName(booking: BookingData): string {
  if (booking.booking_name) {
    return booking.booking_name;
  }

  const month = booking.arrival.getMonth(); // 0-indexed (0 = januari, 11 = december)
  const year = booking.arrival.getFullYear();

  if (month >= 2 && month <= 4) return `Vårresa ${year}`; // Mars–Maj
  if (month >= 5 && month <= 7) return `Sommarresa ${year}`; // Juni–Augusti
  if (month >= 8 && month <= 10) return `Höstresa ${year}`; // September–November
  return `Vinterresa ${year}`; // December–Februari
}