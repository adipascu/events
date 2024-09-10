import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import { MatricsEvent } from "~/types";
import { Show } from "solid-js";
import { loadEvent } from "~/db";
import { Temporal } from "temporal-polyfill";
import {
  FaBrandsApple,
  FaBrandsGoogle,
  FaBrandsMicrosoft,
  FaRegularClock,
  FaSolidLocationDot,
} from "solid-icons/fa";
import { IconTypes } from "solid-icons";

const Event = ({ event }: { event: MatricsEvent }) => {
  const icsFields = {
    title: event.name,
    start: event.start.toPlainDateTime().toString(),
    end: event.end.toPlainDateTime().toString(),
    description: event.description,
    location: event.location,
  };

  const IconLink = ({
    icon: Icon,
    label,
    url,
  }: {
    icon: IconTypes;
    label: string;
    url: string;
  }) => {
    return (
      <a
        class="flex items-center space-x-3 underline"
        href={url}
        target="_blank"
      >
        <Icon />
        <span>{label}</span>
      </a>
    );
  };

  const mapsURL = (location: string) => {
    const url = new URL("https://www.google.com/maps/search/?api=1");
    url.searchParams.set("query", location);
    return url.toString();
  };
  return (
    <div class="max-w-xl rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 sm:my-6">
      <Title>{event.name}</Title>
      <h1 class="text-lg font-semibold">{event.name}</h1>
      <p class="whitespace-pre-line">{event.description}</p>
      <div class="flex items-center space-x-3">
        <FaRegularClock />
        <span>
          {event.start.toLocaleString("en", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
          })}
          {" to "}
          {event.end.toLocaleString("en", {
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "shortGeneric",
          })}
        </span>
      </div>
      <IconLink
        icon={FaSolidLocationDot}
        url={mapsURL(event.location)}
        label={event.location}
      />
      <IconLink
        icon={FaBrandsGoogle}
        url={google(icsFields)}
        label="Add to Google Calendar"
      />
      <IconLink
        icon={FaBrandsMicrosoft}
        url={outlook(icsFields)}
        label="Add to Outlook Calendar"
      />
      <IconLink
        icon={FaBrandsApple}
        url={ics(icsFields)}
        label="Download ICS"
      />
    </div>
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
    <main class="flex justify-center">
      <Title>Matr.ics Event</Title>
      <Show when={event()} fallback="Loading event">
        {(event) => <Event event={parseEvent(event())} />}
      </Show>
    </main>
  );
};

export default EventPage;
