interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.warn("Google Maps API key is not set. Using fallback.");
    return {
      country: "Unknown",
      formattedAddress: `${lat}, ${lng}`,
    };
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      throw new Error(`Geocoding failed: ${data.status}`);
    }

    const result = data.results[0];
    const countryComponent = result.address_components?.find((component: any) =>
      component.types.includes("country")
    );

    return {
      country: countryComponent?.long_name || "Unknown",
      formattedAddress: result.formatted_address || `${lat}, ${lng}`,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      country: "Unknown",
      formattedAddress: `${lat}, ${lng}`,
    };
  }
}
