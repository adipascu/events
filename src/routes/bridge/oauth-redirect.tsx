import { Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import { EVENTBRITE_API_KEY, EVENTBRITE_CLIENT_SECRET, EVENTBRITE_REDIRECT_URL } from "~/config";

const auth = async (code: string) => {
  "use server";
  console.log({ code });

  const tokenUrl = "https://www.eventbrite.com/oauth/token";
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", EVENTBRITE_API_KEY);
  params.append("client_secret", EVENTBRITE_CLIENT_SECRET);
  params.append("code", code);
  params.append("redirect_uri", EVENTBRITE_REDIRECT_URL);

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();
  console.log("auth_dataF", data);
  if (data.error) {
    throw new Error(data.error_description);
  }
  const { access_token } = data;

  const userResponse = await fetch(
    "https://www.eventbriteapi.com/v3/users/me/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const userData = await userResponse.json();

  const orgs = await (
    await fetch("https://www.eventbriteapi.com/v3/users/me/organizations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    })
  ).json();

  const firstOrgID = orgs.organizations[0].id;

  const events = await (
    await fetch(
      "https://www.eventbriteapi.com/v3/organizations/" +
        firstOrgID +
        "/events",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    )
  ).json();

  return { user: userData, orgs, events };
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
      <Title>Logging in with Eventbrite</Title>
      <h1>Eventbrite info</h1>
      <pre>{JSON.stringify(result(), null, "\t")}</pre>
    </main>
  );
}
