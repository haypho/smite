/**
 * The base URL for the Smite API
 */
export const SMITE_BASE_URL = "https://api.smitegame.com/smiteapi.svc";

export const SMITE_SESSION_TTL_IN_MILLIS = 15 * 60 * 1_000;

/**
 * The default content type to use for each Smite API response
 */
export enum SmiteContentType {
  JSON = "JSON",
}

/**
 * The Smite API methods used to build a signature
 */
export enum SmiteMethod {
  CREATE_SESSION = "createsession",
  TEST_SESSION = "testsession",
  GET_GODS = "getgods",
}

/**
 * The language codes for the Smite API
 */
export enum SmiteLanguageCode {
  ENGLISH = "1",
}
