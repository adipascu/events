import { Temporal } from "temporal-polyfill";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { parseCreateEventResponse } from "./types";

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
