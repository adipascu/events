const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const EVENTBRITE_API_KEY = IS_PRODUCTION
  ? "GRVWTE7Y7X2LHU45QQ"
  : "5PKBXOOMVOZ3F2B6QG";

export const EVENTBRITE_REDIRECT_URL = IS_PRODUCTION
  ? "https://matrics.app/bridge/oauth-redirect"
  : "http://localhost:3000/bridge/oauth-redirect";

//secrets, do not leak in client JS!!
export const EVENTBRITE_CLIENT_SECRET = IS_PRODUCTION
  ? "QNTUC55QFTLDY3NIW3NABQFO5EION25H6K24MS63JB7KXUPT7V"
  : "YCZUS6EX2NA5OTL75QV7PFT7JFLAORTGBOP3ZUSVCOLVGDU32V";

export const FACEBOOK_API_KEY = IS_PRODUCTION
  ? "1317565529216655"
  : "1559461711350472";

export const FACEBOOK_REDIRECT_URL = IS_PRODUCTION
  ? "https://matrics.app/bridge/oauth/facebook"
  : "http://localhost:3000/bridge/oauth/facebook";

//secrets, do not leak in client JS!!
export const FACEBOOK_CLIENT_SECRET = IS_PRODUCTION
  ? "1c1a70d900243a0354541285133ab8b5"
  : "d8f08b0288123d66d2f8d94c7b5fc4ff";

export const COUCHDB_URL = "https://admin:rhyGG5GAKiqVZ7@db.adipascu.ro";
