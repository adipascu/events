import nano from "nano";
import { customAlphabet } from "nanoid";
import { COUCHDB_URL } from "./config";

const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
const createID = customAlphabet(nolookalikes, 7);

const dbConnector = nano("https://admin:rhyGG5GAKiqVZ7@db.adipascu.ro");

type Event = {
  name: string;
};

const createEventsDB = (async () => {
  try {
    await dbConnector.db.create("events");
  } catch (e: any) {
    if (e.error !== "file_exists") {
      throw e;
    }
  }
  return dbConnector.db.use<Event>("events");
})();

export const createEvent = async (event: Event) => {
  const ID = createID();
  const eventsDB = await createEventsDB;
  await eventsDB.insert(event, ID);
  return ID;
};

export const loadEvent = async (ID: string) => {
  const eventsDB = await createEventsDB;
  const doc = await eventsDB.get(ID);
  return {
    name: doc.name,
  } satisfies Event;
};
