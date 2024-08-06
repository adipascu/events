import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import { API_KEY, REDIRECT_URL } from "~/config";

export default function Home() {
  const AUTH_URL =
    " https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=" +
    API_KEY +
    "&redirect_uri=" +
    REDIRECT_URL;
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
