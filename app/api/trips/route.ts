import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Not authenticated.", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transformLocations = await Promise.all(
      locations.map(async (loc) => {
        try {
          const geocodeResult = await getCountryFromCoordinates(
            loc.lat,
            loc.lng
          );
          return {
            name: `${loc.trip.title} - ${loc.locationTitle}`,
            lat: loc.lat,
            lng: loc.lng,
            country: geocodeResult.country,
          };
        } catch (geocodeError) {
          console.error(
            "Geocoding error for location:",
            loc.locationTitle,
            geocodeError
          );
          // Return location with fallback data if geocoding fails
          return {
            name: `${loc.trip.title} - ${loc.locationTitle}`,
            lat: loc.lat,
            lng: loc.lng,
            country: "Unknown",
          };
        }
      })
    );
    return NextResponse.json(transformLocations);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
