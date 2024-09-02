import { Temporal } from "temporal-polyfill";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { parseCreateEventResponse, parseVenue } from "./types";

const GET_VENUES_QUERY = gql`
  query suggestVenues(
    $query: String!
    $lat: Float!
    $lon: Float!
    $first: Int
  ) {
    suggestVenues(query: $query, lat: $lat, lon: $lon, first: $first) {
      edges {
        node {
          id
          name
          address
          city
          country
          postalCode
          state
          venueType
          lat
          lon
        }
      }
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      event {
        id
        eventUrl
        title
        group {
          id
        }
      }
      errors {
        code
        message
        field
      }
    }
  }
`;

export const fillMeetup = async ({
  title,
  startDate,
  endDate,
  description,
}: {
  title: string;
  startDate: Temporal.PlainDateTime; // Temporal PlainDateTime for start date
  endDate: Temporal.PlainDateTime; // Temporal PlainDateTime for end date
  description: string;
}) => {
  let client = new ApolloClient({
    ssrMode: false,
    name: "nextjs-web",
    cache: new InMemoryCache(),
    uri: "https://www.meetup.com/gql2",
  });

  let data = {
    input: {
      description,
      duration: startDate.until(endDate).toString(),
      eventHosts: [194460526],
      featuredPhotoId: null,
      fundraising: {
        enabled: false,
      },
      groupUrlname: "hackerspace-brussels",
      publishStatus: "DRAFT",
      question: "",
      rsvpSettings: {
        guestLimit: 0,
        rsvpOpenDuration: "PT0S",
        rsvpCloseDuration: "PT0S",
        rsvpLimit: 0,
      },
      startDateTime: startDate.toString(),
      title,
      topics: [],
      isCopy: false,
    },
  };

  const venuesData = await client.query({
    query: GET_VENUES_QUERY,
    variables: {
      query: "hsbxl",
      lat: 50.83,
      lon: 4.33,
      first: 5,
    },
  });

  const venues = parseVenue(venuesData.data);

  const result = await client.mutate({
    mutation: CREATE_EVENT_MUTATION,
    variables: data,
  });

  const res = parseCreateEventResponse(result);
  console.log({ res });
  if (res.data.createEvent.errors.length > 0) {
    console.log(res.data.createEvent.errors);
    throw new Error("Failed to create event");
  }
  return res.data.createEvent.event;
};
