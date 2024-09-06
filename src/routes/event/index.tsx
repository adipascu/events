import { action } from "@solidjs/router";

const handleSubmit = action<[FormData]>(async (formData) => {
  "use server";
  const eventData = {
    name: formData.get("name"),
    startDateTime: formData.get("start-datetime"),
    endDateTime: formData.get("end-datetime"),
    location: formData.get("location"),
  };

  console.log("Event Created:", eventData);
});

function EventForm() {
  return (
    <form action={handleSubmit} method="post">
      <div>
        <label for="name">Event Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="start-datetime">Event Start Date and Time:</label>
        <input
          type="datetime-local"
          id="start-datetime"
          name="start-datetime"
          required
        />
      </div>
      <div>
        <label for="end-datetime">Event End Date and Time:</label>
        <input
          type="datetime-local"
          id="end-datetime"
          name="end-datetime"
          required
        />
      </div>
      <div>
        <label for="location">Event Location:</label>
        <input type="text" id="location" name="location" required />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
