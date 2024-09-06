import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { EVENTBRITE_API_KEY, EVENTBRITE_REDIRECT_URL } from "~/config";

export default function Home() {
  const params = useParams();
  return (
    <main>
      <Title>Create an event</Title>
      <h1>Create an event</h1>
      ID: {params.id}
    </main>
  );
}
