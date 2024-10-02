import { Title } from "@solidjs/meta";
import { action, redirect } from "@solidjs/router";
import { Temporal } from "temporal-polyfill";
import { IS_PRODUCTION } from "~/config";
import { createEvent } from "~/db";
import Editor from "~/editor";

const handleSubmit = action<[FormData]>(async (formData) => {
  "use server";

  const phoneNumbers = formData.getAll("phone-numbers") as string[];

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
    phoneNumbers,
  });
  console.log("Event Created with ID " + eventID);
  console.log("Phone numbers: ", phoneNumbers);
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
    <form
      action={handleSubmit}
      method="post"
      class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h1 class="text-2xl font-bold mb-6">Create an Event</h1>
      <div class="space-y-2">
        <label for="name" class="block text-gray-700 font-medium">
          Event Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full border-gray-300 rounded-md shadow-sm"
          value={IS_PRODUCTION ? "" : "TechTuesday"}
        />
      </div>
      <div class="space-y-2">
        <label for="start-datetime" class="block text-gray-700 font-medium">
          Event Start Date and Time:
        </label>
        <input
          type="datetime-local"
          id="start-datetime"
          name="start-datetime"
          required
          class="w-full border-gray-300 rounded-md shadow-sm"
          value={IS_PRODUCTION ? "" : "2024-09-10T19:00"}
        />
      </div>
      <div class="space-y-2">
        <label for="end-datetime" class="block text-gray-700 font-medium">
          Event End Date and Time:
        </label>
        <input
          type="datetime-local"
          id="end-datetime"
          name="end-datetime"
          required
          class="w-full border-gray-300 rounded-md shadow-sm"
          value={IS_PRODUCTION ? "" : "2024-09-10T22:00"}
        />
      </div>
      <div class="space-y-2">
        <label for="location" class="block text-gray-700 font-medium">
          Event Location:
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          class="w-full border-gray-300 rounded-md shadow-sm"
          value={IS_PRODUCTION ? "" : "HSBXL"}
        />
      </div>

      <div class="space-y-2">
        <label for="description" class="block text-gray-700 font-medium">
          Event Description:
        </label>
        <Editor>{IS_PRODUCTION ? "" : PLACEHOLDER_DESCRIPTION}</Editor>
      </div>

      <div class="space-y-2">
        <label for="phone-numbers" class="block text-gray-700 font-medium">
          Recipients' Phone Numbers (comma-separated):
        </label>
        <input
          type="text"
          id="phone-numbers"
          name="phone-numbers"
          class="w-full border-gray-300 rounded-md shadow-sm"
          placeholder="e.g. +1234567890, +9876543210"
          value={IS_PRODUCTION ? "" : "+40745080000"}
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
}

export default EventForm;
