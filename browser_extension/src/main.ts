import { fillMeetup } from "./meetup";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillMeetup") {
    fillMeetup({ title: "Hello world!" });
  }
});
