import nano from "nano";
import { customAlphabet } from "nanoid";
import { COUCHDB_URL } from "./config";

const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
const createID = customAlphabet(nolookalikes, 7);

const dbConnector = nano(COUCHDB_URL);

type Event = {
  name: string;
};

try {
  await dbConnector.db.create("events");
} catch (e: any) {
  if (e.error !== "file_exists") {
    throw e;
  }
}

const eventsDB = dbConnector.db.use<Event>("events");

export const createEvent = async (event: Event) => {
  const ID = createID();
  await eventsDB.insert(event, ID);
  return ID;
};

export const loadEvent = async (ID: string) => {
  const doc = await eventsDB.get(ID);
  return {
    name: doc.name,
  } satisfies Event;
};
