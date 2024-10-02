import { Temporal } from "temporal-polyfill";

export type MatricsEvent = {
  name: string;
  description: string;
  location: string;
  start: Temporal.ZonedDateTime;
  end: Temporal.ZonedDateTime;
  phoneNumbers: string[];
};
