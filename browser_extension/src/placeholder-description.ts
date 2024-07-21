const md = (raw: TemplateStringsArray, ...keys: string[]): string =>
  keys.length === 0 ? raw[0]! : String.raw({ raw }, ...keys);

export const PLACEHOLDER_DESCRIPTION = md`
**Date:** Saturday, September 21, 2024
**Time:** 2:00 PM - 4:00 PM
**Location:** Whiskers & Wonders Cat Café, 123 Feline Lane, Catville
Calling all cat enthusiasts! Whether you're a proud cat parent, a dedicated volunteer, or just a feline fanatic, this is the meetup for you. Join us at Whiskers & Wonders Cat Café for an afternoon of purrs, play, and plenty of cat-themed fun.
**What to Expect:**

- **Cat Cuddles & Playtime:** Spend time with adorable adoptable cats in the café’s cozy cat lounge. They’re waiting for some love and attention!
- **Cat-Themed Games & Trivia:** Test your knowledge with our cat trivia and win some purrific prizes.
- **Meet & Greet:** Connect with fellow cat lovers, share stories, and discuss all things feline.
- **DIY Cat Toys Workshop:** Get creative and make some simple, fun toys for your own cats or for local shelters.

**RSVP Details:**
Please RSVP by September 18 to secure your spot, as space is limited. Feel free to bring along any cat photos or stories to share!
Whether you're coming to meet new friends or just to enjoy the company of some furry felines, we can't wait to see you there. Let's make this gathering a meow-nificent success!
**Note:** If you have allergies, please take necessary precautions as there will be cats present.
`;
