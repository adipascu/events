"use server";

import nano from "nano";
import { customAlphabet } from "nanoid";
import { COUCHDB_URL } from "./config";
import { MatricsEvent } from "./types";
import { Temporal } from "temporal-polyfill";

const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
const createID = customAlphabet(nolookalikes, 7);

const dbConnector = nano(COUCHDB_URL);

const createEventsDB = (async () => {
  try {
    await dbConnector.db.create("events");
  } catch (e: any) {
    if (e.error !== "file_exists") {
      throw e;
    }
  }
  return dbConnector.db.use<{
    name: string;
    description: string;
    location: string;
    start: string;
    end: string;
  }>("events");
})();

export const createEvent = async (event: MatricsEvent) => {
  const ID = createID();
  const eventsDB = await createEventsDB;

  await eventsDB.insert(
    { ...event, start: event.start.toString(), end: event.end.toString() },
    ID
  );

  return ID;
};

export const loadEvent = async (ID: string) => {
  const eventsDB = await createEventsDB;
  return await eventsDB.get(ID);
};
