import { BookingData } from "@/lib/types";
import { getRoomName, showGuests } from "@/lib/functions";
import {
  Section,
  Heading,
  Text,
  Container,
  Img,
  Row,
  Column,
  Tailwind,
  Html,
  Body,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  booking: BookingData;
}

export function EmailBookingOwner({ booking }: EmailTemplateProps) {
  return (
    <Html lang="sv" style={{fontFamily: 'sans-serif'}}>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#383c2b",
                black: "#0e100e",
              },
            },
          },
        }}
      >
        <Body className="m-0">
          <Section className="bg-primary">
            <Container className="p-6">
              <Img
                alt="Stenbrottsvägen"
                className="mx-auto"
                width={32}
                src="https://kalkbrottet.vercel.app/sbv-logo.png"
              />
            </Container>
            <div className="bg-white rounded-t-2xl h-4 block"></div>
          </Section>
          <Section>
            <Container className="px-6">
              <Heading as="h1" className="text-black">
                Din bokning är bekräftad
              </Heading>
              <Text>Hej {booking.name}, din bokning är registrerad och nedan kan du se dina bokningsdetaljer. </Text>
              <Row className="mt-6">
                <Column className="w-4/12">
                  <Text className="text-gray-600">Incheckning</Text>
                </Column>
                <Column className="w-8/12">
                  <Text className="text-black text-right">
                    {new Date(
                      booking.arrival
                    ).toLocaleDateString("sv-SE")}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-4/12">
                  <Text className="text-gray-600">Utcheckning</Text>
                </Column>
                <Column className="w-8/12">
                  <Text className="text-black text-right">
                    {new Date(
                      booking.departure
                    ).toLocaleDateString("sv-SE")}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-4/12">
                  <Text className="text-gray-600">Gäster</Text>
                </Column>
                <Column className="w-8/12">
                  <Text className="text-black text-right">
                    {
                      showGuests(
                        booking.guests,
                        booking.guests_children as number
                      ).divided
                    }
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column className="w-4/12">
                  <Text className="text-gray-600">Rum</Text>
                </Column>
                <Column className="w-8/12">
                  <Text className="text-black text-right">
                    {getRoomName(booking.rooms)}
                  </Text>
                </Column>
              </Row>
              {booking.message && (
                <Row>
                  <Column className="w-4/12">
                    <Text className="text-gray-600">Meddelande</Text>
                  </Column>
                  <Column className="w-8/12 text-right">
                    <Text className="text-black">{booking.message}</Text>
                  </Column>
                </Row>
              )}
            </Container>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
