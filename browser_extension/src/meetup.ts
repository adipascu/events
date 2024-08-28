import { getDiv, getInputField, setReactField } from "./field";

type Event = {
  title: string;
};

export const fillMeetup = ({ title }: Event) => {
  const titleField = getInputField("#event-schedule-main input[name=title]");
  setReactField(titleField, title);

  const startDateField = getInputField(
    "#event-schedule-main .DayPickerInput input",
    (parent) => {
      return !parent.classList.contains("hidden");
    }
  );
  setReactField(startDateField, "Thu, Sep 20, 2025");

  const startTimeField = getInputField(
    "#event-schedule-main input[type=time]",
    (parent) => {
      return !parent.classList.contains("hidden");
    }
  );
  setReactField(startTimeField, "04:20");

  const div = getDiv(".toastui-editor-ww-container .toastui-editor-contents");
  div.innerHTML = `<h1>Cat Lovers Unite: A Purrfect Meetup!</h1>

<p><strong>Date:</strong> Saturday, September 21, 2024</p>
<p><strong>Time:</strong> 2:00 PM - 4:00 PM</p>
<p><strong>Location:</strong> Whiskers & Wonders Cat Café, 123 Feline Lane, Catville</p>

<p>Calling all cat enthusiasts! Whether you're a proud cat parent, a dedicated volunteer, or just a feline fanatic, this is the meetup for you. Join us at Whiskers & Wonders Cat Café for an afternoon of purrs, play, and plenty of cat-themed fun.</p>

<p><strong>What to Expect:</strong></p>
<ul>
    <li><strong>Cat Cuddles & Playtime:</strong> Spend time with adorable adoptable cats in the café’s cozy cat lounge. They’re waiting for some love and attention!</li>
    <li><strong>Cat-Themed Games & Trivia:</strong> Test your knowledge with our cat trivia and win some purrific prizes.</li>
    <li><strong>Meet & Greet:</strong> Connect with fellow cat lovers, share stories, and discuss all things feline.</li>
    <li><strong>DIY Cat Toys Workshop:</strong> Get creative and make some simple, fun toys for your own cats or for local shelters.</li>
</ul>

<p><strong>RSVP Details:</strong></p>
<p>Please RSVP by September 18 to secure your spot, as space is limited. Feel free to bring along any cat photos or stories to share!</p>

<p>Whether you're coming to meet new friends or just to enjoy the company of some furry felines, we can't wait to see you there. Let's make this gathering a meow-nificent success!</p>

<p><strong>Note:</strong> If you have allergies, please take necessary precautions as there will be cats present.</p>
`;
};
