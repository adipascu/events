import { Temporal } from "temporal-polyfill";
import { fillMeetup } from "./meetup";
import { PLACEHOLDER_DESCRIPTION } from "./placeholder-description";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fillMeetup") {
    const today = Temporal.Now.plainDateTimeISO();
    const tomorrow = today.add({ days: 1 });

    const startDate = Temporal.PlainDateTime.from(
      `${tomorrow.toPlainDate().toString()}T14:00:00`
    );
    const endDate = Temporal.PlainDateTime.from(
      `${tomorrow.toPlainDate().toString()}T16:00:00`
    );

    const event = await fillMeetup({
      title: "Placeholder Event",
      startDate,
      endDate,
      description: PLACEHOLDER_DESCRIPTION,
    });

    window.location.href = event.eventUrl;
  }
});
