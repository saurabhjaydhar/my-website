import type { NextApiRequest, NextApiResponse } from 'next';

interface AddressComponent {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

interface ApiResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  hasZipCode: boolean;
}

const HasZipCode = (obj: AddressComponent[]): boolean => {
  for (const x of obj) {
    const elem = x.address_components;
    for (const y of elem) {
      if (y.types.includes("postal_code")) {
        return true;
      }
    }
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  try {
    const response = await fetch(`https://ipapi.co/json/`);
    const data = await response.json();
    
    if (data.error) {
      res.status(500).json({ error: "Failed to fetch IP info" });
      return;
    }

    const { latitude, longitude } = data;
    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.error_message) {
      res.status(500).json({ error: geocodeData.error_message });
      return;
    }

    const hasZipCode = HasZipCode(geocodeData.results);
    res.status(200).json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      hasZipCode
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
}