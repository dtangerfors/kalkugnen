import { BookingFormValues } from "@/components/forms/booking";

interface Values {
  booking: BookingFormValues;
  email: string;
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://stenbrottsvagen.se`
    : "http://localhost:3000";

const SEND_URL = BASE_URL + "/api/send";

export const sendEmail = async (values: Values) => {
  try {
    // Ensure dates are properly stringified
    const sanitizedBooking = {
      ...values.booking,
        arrival: values.booking.dates?.from.toString(),
        departure: values.booking.dates?.to.toString()
    };

    const response = await fetch(SEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking: sanitizedBooking,
        email: values.email
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('There was a problem sending the email:', error);
    throw error;
  }
};