import { Title } from "@solidjs/meta";
import { action, redirect } from "@solidjs/router";
import { Temporal } from "temporal-polyfill";
import { IS_PRODUCTION } from "~/config";
import { createEvent } from "~/db";
import Editor from "~/editor";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { phone } from "phone";

const handleSubmit = action(async (formData: FormData) => {
  "use server";

  const phoneNumbersRaw = formData.getAll("phone-numbers[]") as string[];
  const phoneNumbers = phoneNumbersRaw.map((number) => {
    const result = phone(number);
    if (result.isValid) {
      return result.phoneNumber;
    } else {
      throw new Error(`Invalid phone number: ${number}`);
    }
  });

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
  const [phoneNumbers, setPhoneNumbers] = createStore<
    { number: string; valid: boolean }[]
  >([]);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { number: "", valid: false }]);
  };

  const removePhoneNumber = (index: number) => {
    setPhoneNumbers((phones) => phones.filter((_, i) => i !== index));
  };

  const updatePhoneNumber = (index: number, value: string) => {
    const result = phone(value);
    setPhoneNumbers(index, { number: value, valid: result.isValid });
  };

  const isFormValid = () => {
    return phoneNumbers.every((phoneNumber) => phoneNumber.valid);
  };

  return (
    <form
      action={handleSubmit}
      method="post"
      class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h1 class="text-2xl font-bold mb-6">Create an Event</h1>

      <Show when={handleSubmit.error}>
        <div class="text-red-500">{handleSubmit.error.message}</div>
      </Show>

      <div class="space-y-2">
        <label for="name" class="block text-gray-700 font-medium">
          Event Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="w-full border border-gray-300 rounded-md shadow-sm"
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
          class="w-full border border-gray-300 rounded-md shadow-sm"
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
          class="w-full border border-gray-300 rounded-md shadow-sm"
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
          class="w-full border border-gray-300 rounded-md shadow-sm"
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
        <label class="block text-gray-700 font-medium">
          Recipients' Phone Numbers:
        </label>
        <For each={phoneNumbers}>
          {(phoneNumber, index) => (
            <div class="flex items-center space-x-2">
              <input
                type="tel"
                name="phone-numbers[]"
                value={phoneNumber.number}
                onInput={(e) =>
                  updatePhoneNumber(index(), e.currentTarget.value)
                }
                class={`w-full border-2 rounded-md shadow-sm ${
                  phoneNumber.valid ? "border-green-500" : "border-red-500"
                }`}
                inputMode="tel"
                autocomplete="tel"
              />
              <button
                type="button"
                onClick={() => removePhoneNumber(index())}
                class="text-red-500"
              >
                Remove
              </button>
            </div>
          )}
        </For>
        <button
          type="button"
          onClick={addPhoneNumber}
          class="mt-2 bg-green-500 text-white py-1 px-2 rounded-md"
        >
          Add Phone Number
        </button>
      </div>

      <button
        type="submit"
        disabled={!isFormValid()}
        class={`w-full py-2 px-4 rounded-md ${
          isFormValid()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Create Event
      </button>
    </form>
  );
}

export default EventForm;
