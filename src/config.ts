const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const API_KEY = IS_PRODUCTION
  ? "GRVWTE7Y7X2LHU45QQ"
  : "5PKBXOOMVOZ3F2B6QG";
export const REDIRECT_URL = IS_PRODUCTION
  ? "https://matrics.app/bridge/oauth-redirect"
  : "http://localhost:3000/bridge/oauth-redirect";

//secrets, do not leak in client JS!!
export const CLIENT_SECRET = IS_PRODUCTION
  ? "QNTUC55QFTLDY3NIW3NABQFO5EION25H6K24MS63JB7KXUPT7V"
  : "YCZUS6EX2NA5OTL75QV7PFT7JFLAORTGBOP3ZUSVCOLVGDU32V";
