import { FACEBOOK_API_KEY, FACEBOOK_REDIRECT_URL } from "~/config";
const publish = (title: string) => {
  "use server";
  console.log("publishing " + title);
};

const AUTH_URL =
  "https://www.facebook.com/v20.0/dialog/oauth?display=popup&client_id=" +
  FACEBOOK_API_KEY +
  "&redirect_uri=" +
  FACEBOOK_REDIRECT_URL +
  "&scope=email,business_management,pages_manage_ads,pages_manage_metadata,pages_read_engagement,pages_read_user_content,ads_read,ads_management,catalog_management,instagram_basic,pages_manage_ads,pages_manage_metadata,pages_read_engagement,pages_read_user_content";
// "&scope=pages_read_engagement,email";

export default function Home() {
  let eventNameInput!: HTMLInputElement;

  return (
    <main>
      <h1>Publish to Facebook</h1>
      <a href={AUTH_URL} target="_blank">
        Click here
      </a>
      <input ref={eventNameInput}></input>

      <button
        onClick={() => {
          publish(eventNameInput.value);
        }}
      >
        Do it!
      </button>
    </main>
  );
}
