import { Temporal } from "temporal-polyfill";

export type MatricsEventPublic = {
  name: string;
  description: string;
  location: string;
  start: Temporal.ZonedDateTime;
  end: Temporal.ZonedDateTime;
};

export type MatricsEventPrivate = MatricsEventPublic & {
  phoneNumbers: string[];
};
