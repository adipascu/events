import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import { EVENTBRITE_API_KEY, EVENTBRITE_REDIRECT_URL } from "~/config";

export default function Home() {
  const AUTH_URL =
    " https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=" +
    EVENTBRITE_API_KEY +
    "&redirect_uri=" +
    EVENTBRITE_REDIRECT_URL;
  return (
    <main>
      <Title>Login with Eventbrite</Title>
      <h1>Login with Eventbrite</h1>

      <a href={AUTH_URL} target="_blank">
        Click here
      </a>
    </main>
  );
}
