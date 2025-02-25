import { EmailBookingOwner } from '@/components/emails/email-booking-owner';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { booking, email } = body;

    // Create a plain text version of the email content
    const plainText = `
      Bokningsbekräftelse
      
      Hej ${booking.name},
      
      Din bokning är bekräftad med följande detaljer:
      
      Datum: ${new Date(booking.arrival).toLocaleDateString('sv-SE')} - ${new Date(booking.departure).toLocaleDateString('sv-SE')}
      Antal gäster: ${booking.guests}
      ${booking.message ? `Meddelande: ${booking.message}` : ''}
    `;

    const emailResponse = await resend.emails.send({
      from: 'Stenbrottsvägen 3 <bokning@sbv-booking.dtangerfors.se>',
      to: email,
      subject: 'Bokningsbekräftelse',
      react: EmailBookingOwner({ booking }),
      text: plainText,
    });

    if (!emailResponse.data!.id) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ success: true, id: emailResponse.data!.id });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email', details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
