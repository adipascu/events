import { Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import { loadEvent } from "~/db";

const loadStuff = async (id: string) => {
  "use server";
  return await loadEvent(id);
};
export default function Home() {
  const params = useParams();
  const event = createAsync(() => {
    return loadStuff(params.id);
  });
  return (
    <main>
      <Title>Create an event</Title>
      <h1>Create an event</h1>
      Name: {event()?.name}
    </main>
  );
}
