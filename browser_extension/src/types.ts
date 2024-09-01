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
    typeof (data as any).data === "object" &&
    (data as any).data !== null &&
    "createEvent" in (data as any).data &&
    typeof (data as any).data.createEvent === "object" &&
    (data as any).data.createEvent !== null &&
    "event" in (data as any).data.createEvent &&
    "errors" in (data as any).data.createEvent &&
    Array.isArray((data as any).data.createEvent.errors)
  ) {
    return data as CreateEventMutationResponse;
  } else {
    throw new Error("Invalid response format");
  }
};
