import type { NextApiRequest, NextApiResponse } from 'next';

interface AddressComponent {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

interface LocationInfo {
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  datetime: string;
}

const HasZipCode = (obj: AddressComponent[]): string => {
  for (const x of obj) {
    const elem = x.address_components;
    for (const y of elem) {
      if (y.types.includes("postal_code")) {
        return y.long_name;
      }
    }
  }
  return "00000";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationInfo | { error: string }>
) {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon || Array.isArray(lat) || Array.isArray(lon)) {
      res.status(400).json({ error: "Invalid latitude or longitude" });
      return;
    }

    const geocodeResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.error_message) {
      res.status(500).json({ error: geocodeData.error_message });
      return;
    }

    const zipCode = HasZipCode(geocodeData.results);
    const locationInfo = geocodeData.results[0]?.address_components?.reduce((acc: any, component: any) => {
      if (component.types.includes("country")) {
        acc.country = component.long_name;
        acc.countryCode = component.short_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        acc.region = component.short_name;
        acc.regionName = component.long_name;
      } else if (component.types.includes("locality")) {
        acc.city = component.long_name;
      }
      return acc;
    }, {});

    res.status(200).json({
      ...locationInfo,
      zipCode,
      latitude: lat,
      longitude: lon,
      datetime: new Date().toLocaleString("en-US"),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
}
