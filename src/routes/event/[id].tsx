import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import { loadEvent } from "~/db";

export default function Home() {
  const params = useParams();
  const event = createAsync(() => {
    return loadEvent(params.id);
  });
  return (
    <main>
      <Title>Event information</Title>
      <h1>Event information</h1>
      Name: {event()?.name}
    </main>
  );
}
