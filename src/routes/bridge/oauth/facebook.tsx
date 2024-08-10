import { Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import {
  EVENTBRITE_API_KEY,
  EVENTBRITE_CLIENT_SECRET,
  EVENTBRITE_REDIRECT_URL,
  FACEBOOK_API_KEY,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL,
} from "~/config";

const auth = async (code: string) => {
  "use server";
  console.log({ code });

  const tokenUrl = "https://graph.facebook.com/v20.0/oauth/access_token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", FACEBOOK_API_KEY);
  params.append("client_secret", FACEBOOK_CLIENT_SECRET);
  params.append("code", code);
  params.append("redirect_uri", FACEBOOK_REDIRECT_URL);

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  console.log("auth_data", data);
  if (data.error) {
    throw new Error(data.error_description);
  }
  const { access_token } = data; // Fetch the first page the user has access to
  const pagesUrl = `https://graph.facebook.com/v20.0/me/accounts`;
  const pagesResponse = await fetch(pagesUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  const pagesData = await pagesResponse.json();
  console.log("pages_data", pagesData);

  if (!pagesData.data || pagesData.data.length === 0) {
    throw new Error("No pages found");
  }

  const page = pagesData.data[0]; // Fetch the first page
  const pageAccessToken = page.access_token;
  const pageId = page.id;

  console.log("page_data", { pageId, pageAccessToken });

  // Create an official event on the page
  const eventUrl = `https://graph.facebook.com/v20.0/official_events`;
  const eventParams = {
    access_token: pageAccessToken, // Use page's access token
    category: "FAMILY_EVENT", // Example category, replace with your choice
    name: "Sample Official Event Name",
    description: "Sample Official Event Description",
    place_id: pageId, // Assuming the page has a place set up
    timezone: "US/Pacific", // Replace with the correct timezone
    start_time: "2024-09-01T18:00:00Z", // Adjust your start time
    end_time: "2024-09-01T20:00:00Z", // Adjust your end time
    cover: {
      source: "https://example.com/cover.jpg", // Replace with the actual cover photo URL
      offset_x: 0,
      offset_y: 0,
    },
  };

  const eventResponse = await fetch(eventUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pageAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventParams),
  });

  const eventData = await eventResponse.json();
  console.log("event_data", eventData);
  if (eventData.error) {
    throw new Error(eventData.error.message);
  }

  const eventId = eventData.id;
  const eventPageUrl = `https://www.facebook.com/events/${eventId}`;

  console.log("Official Event created successfully:", eventPageUrl);
  return eventPageUrl;
};

export default function Home() {
  const [searchParams] = useSearchParams();
  const code = searchParams.code;
  if (!code) {
    throw new Error("Missing code");
  }

  const result = createAsync(() => auth(code));
  return (
    <main>
      <Title>Logging in with Facebok</Title>
      <h1>Facebook info</h1>
      <pre>{JSON.stringify(result(), null, "\t")}</pre>
    </main>
  );
}
