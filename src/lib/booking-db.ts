import { prisma } from "@/lib/prisma";

/**
 * Bookings made in the dev environment are stored in a dedicated `DevBooking`
 * table so they never mix with real production bookings. Both models share the
 * same shape, so we expose the environment-appropriate delegate under one name.
 *
 * In dev, every booking read and write goes to `DevBooking`; in production it
 * goes to `Booking`. The cast keeps every call site typed against the production
 * `Booking` model — safe because the two tables are structurally identical.
 */
export const bookingDb = (
  process.env.NODE_ENV === "development" ? prisma.devBooking : prisma.booking
) as typeof prisma.booking;
