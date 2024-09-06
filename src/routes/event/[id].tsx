import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { MatricsEvent } from "~/types";
import { Show } from "solid-js";
import { loadEvent } from "~/db";
import { Temporal } from "temporal-polyfill";

export type MatricsEvent = {
  name: string;
  description: string;
  location: string;
  start: Temporal.ZonedDateTime;
  end: Temporal.ZonedDateTime;
};

const Event = ({ event }: { event: MatricsEvent }) => {
  const icsFields = {
    title: event.name,
    start: event.start.toPlainDateTime().toString(),
    end: event.end.toPlainDateTime().toString(),
    description: event.description,
    location: event.location,
  };
  return (
    <>
      <div>Name: {event.name}</div>
      <div>Description: {event.description}</div>
      <div>Location: {event.location}</div>
      <div>Start: {event.start.toString()}</div>
      <div>End: {event.end.toString()}</div>
      <div>
        <a href={google(icsFields)}>Add to Google Calendar</a>
      </div>
      <div>
        <a href={outlook(icsFields)}>Add to Outlook Calendar</a>
      </div>
      <div>
        <a href={ics(icsFields)} download={`${event.name}.ics`}>
          Download ICS
        </a>
      </div>
    </>
  );
};

const parseEvent = (doc: any) => {
  return {
    name: doc.name,
    description: doc.description,
    location: doc.location,
    start: Temporal.ZonedDateTime.from(doc.start),
    end: Temporal.ZonedDateTime.from(doc.end),
  } satisfies MatricsEvent;
};
const EventPage = () => {
  const params = useParams();
  const event = createAsync(() => {
    return loadEvent(params.id);
  });
  return (
    <main>
      <Title>Event information</Title>
      <h1>Event information</h1>
      <Show when={event()} fallback="Loading event">
        {(event) => <Event event={parseEvent(event())} />}
      </Show>
    </main>
  );
};

export default EventPage;
