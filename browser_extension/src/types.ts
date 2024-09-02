type CreateEventMutationResponse = {
  data: {
    createEvent: {
      event: {
        id: string;
        eventUrl: string;
        title: string;
        group: {
          id: string;
        };
      };
      errors: {
        code: string;
        message: string;
        field?: string;
      }[];
    };
  };
};

export const parseCreateEventResponse = (
  data: unknown
): CreateEventMutationResponse => {
  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    typeof data.data === "object" &&
    data.data !== null &&
    "createEvent" in data.data &&
    typeof data.data.createEvent === "object" &&
    data.data.createEvent !== null &&
    "event" in data.data.createEvent &&
    "errors" in data.data.createEvent &&
    Array.isArray(data.data.createEvent.errors)
  ) {
    return data as CreateEventMutationResponse;
  } else {
    throw new Error("Invalid response format");
  }
};

type Venue = {
  id: string;
  name: string;
  address: string | null;
  city: string;
  country: string;
  postalCode: string | null;
  state: string;
  venueType: string;
  lat: number;
  lon: number;
};

export const parseVenue = (data: unknown): Venue => {
  if (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof data.id === "string" &&
    "name" in data &&
    typeof data.name === "string" &&
    (!("address" in data) ||
      typeof data.address === "string" ||
      data.address === null) &&
    "city" in data &&
    typeof data.city === "string" &&
    "country" in data &&
    typeof data.country === "string" &&
    (!("postalCode" in data) ||
      typeof data.postalCode === "string" ||
      data.postalCode === null) &&
    "state" in data &&
    typeof data.state === "string" &&
    "venueType" in data &&
    typeof data.venueType === "string" &&
    "lat" in data &&
    typeof data.lat === "number" &&
    "lon" in data &&
    typeof data.lon === "number"
  ) {
    return {
      id: data.id,
      name: data.name,
      address:
        "address" in data && typeof data.address === "string"
          ? data.address
          : null,
      city: data.city,
      country: data.country,
      postalCode:
        "postalCode" in data && typeof data.postalCode === "string"
          ? data.postalCode
          : null,
      state: data.state,
      venueType: data.venueType,
      lat: data.lat,
      lon: data.lon,
    };
  } else {
    throw new Error("Invalid venue format");
  }
};
