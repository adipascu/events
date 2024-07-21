import { isServer } from "solid-js/web";

export const IS_PRODUCTION = import.meta.env.PROD;

export const EVENTBRITE_API_KEY = IS_PRODUCTION
  ? "XXX"
  : "XXX";

export const EVENTBRITE_REDIRECT_URL = IS_PRODUCTION
  ? "https://matrics.app/bridge/oauth-redirect"
  : "http://localhost:3000/bridge/oauth-redirect";

//secrets, do not leak in client JS!!
export const EVENTBRITE_CLIENT_SECRET = IS_PRODUCTION
  ? "XXX"
  : "XXX";

export const FACEBOOK_API_KEY = IS_PRODUCTION
  ? "XXX"
  : "XXX";

export const FACEBOOK_REDIRECT_URL = IS_PRODUCTION
  ? "https://matrics.app/bridge/oauth/facebook"
  : "http://localhost:3000/bridge/oauth/facebook";

//secrets, do not leak in client JS!!
export const FACEBOOK_CLIENT_SECRET = IS_PRODUCTION
  ? "XXX"
  : "XXX";

export const COUCHDB_URL = (() => {
  const data = process.env.COUCHDB_URL;
  if (isServer) {
    if (!data) {
      throw new Error("Missing COUCHDB_URL env var");
    }
    return data;
  } else {
    if (data) {
      console.error("Data leak");
    }
    return "";
  }
})();
