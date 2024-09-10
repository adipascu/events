import { action, redirect } from "@solidjs/router";
import { Temporal } from "temporal-polyfill";
import { IS_PRODUCTION } from "~/config";
import { createEvent } from "~/db";

const handleSubmit = action<[FormData]>(async (formData) => {
  "use server";

  const eventID = await createEvent({
    name: formData.get("name") as string,
    start: Temporal.PlainDateTime.from(
      formData.get("start-datetime") as string
    ).toZonedDateTime("Europe/Brussels"),
    end: Temporal.PlainDateTime.from(
      formData.get("end-datetime") as string
    ).toZonedDateTime("Europe/Brussels"),
    location: formData.get("location") as string,
    description: formData.get("description") as string,
  });
  console.log("Event Created with ID " + eventID);
  throw redirect("/event/" + eventID);
});

const PLACEHOLDER_DESCRIPTION = `
Every Tuesday is TechTuesday at HSBXL. It’s where tech enthusiasts hang out, projects get tinkered with, and the occasional debate over the best programming language ensues.

Whether you’re an old hand at hacking or just dipping your toes:

Chats & Code: Engage in hushed tech tales, showcase your latest digital masterpiece, or simply bask in the mesmerizing rhythm of coders at work.

Ambient Rhythms: We curate a backdrop of everything from ambient rock to downtempo electronica. It sets the mood, enhancing the creativity without becoming a distraction.

Refreshment Protocol: Club Mate to fuel your creativity, assorted beers for contemplation, and soft drinks for a refreshing pause. Choose your brew.

Machinery Magic: Our space boasts more than just computers. Soldering irons hiss and 3D printers hum, telling tales of projects brought to life.

Knowledge Exchange: Encountered a tech puzzle? Someone in the room might have just the insight you need. And if you’ve unraveled a digital mystery, consider sharing it.
`;

function EventForm() {
  return (
    <form action={handleSubmit} method="post">
      <div>
        <label for="name">Event Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={IS_PRODUCTION ? "" : "TechTuesday"}
        />
      </div>
      <div>
        <label for="start-datetime">Event Start Date and Time:</label>
        <input
          type="datetime-local"
          id="start-datetime"
          name="start-datetime"
          required
          value={IS_PRODUCTION ? "" : "2024-09-10T19:00"}
        />
      </div>
      <div>
        <label for="end-datetime">Event End Date and Time:</label>
        <input
          type="datetime-local"
          id="end-datetime"
          name="end-datetime"
          required
          value={IS_PRODUCTION ? "" : "2024-09-10T22:00"}
        />
      </div>
      <div>
        <label for="location">Event Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          value={IS_PRODUCTION ? "" : "HSBXL"}
        />
      </div>
      <div>
        <label for="description">Event Description:</label>
        <textarea id="description" name="description" required>
          {IS_PRODUCTION ? "" : PLACEHOLDER_DESCRIPTION}
        </textarea>
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
