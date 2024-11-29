import { isServer } from "solid-js/web";

export const IS_PRODUCTION = import.meta.env.PROD;

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
