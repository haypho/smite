import md5 from "md5";

/**
 * The base URL for the Smite API
 */
export const SmiteBaseURL = "https://api.smitegame.com/smiteapi.svc"

/**
 * The default content type to use for each Smite API response
 */
export const SmiteContentType = "JSON";

/**
 * The Smite API methods used to build a signature
 */
export const SmiteMethod = {
  CREATE_SESSION: "createsession",
  TEST_SESSION: "testsession",
  GET_GODS: "getgods",
};

/**
 * The language codes for the Smite API
 */
export const SmiteLanguageCode = {
  ENGLISH: '1',
};

/**
 * Returns the UTC timestamp in yyyyMMddHHmmss format.
 * @returns the UTC timestampin yyyyMMddHHmmss format.
 */
export const getTimestampUTC = () => {
  const now = new Date();
  const year = `${now.getUTCFullYear()}`.padStart(4, '0');
  const month = `${now.getUTCMonth() + 1}`.padStart(2, '0'); // Zero-indexed
  const date = `${now.getUTCDate()}`.padStart(2, '0');
  const hours = `${now.getUTCHours()}`.padStart(2, '0');
  const minutes = `${now.getUTCMinutes()}`.padStart(2, '0');
  const seconds = `${now.getUTCSeconds()}`.padStart(2, '0');
  return `${year}${month}${date}${hours}${minutes}${seconds}`;
}

/**
 * Builder pattern for the signature
 */
export class SignatureBuilder {
  constructor() {
    this.authKey = null;
    this.developerId = null;
    this.method = null;
  }

  /**
   * Set the authorization key for the Smite API
   * @param {string} authKey - The authorization key for the Smite API
   * @return {SignatureBuilder} the current buider
   */
  withAuthKey = (authKey) => {
    this.authKey = authKey;
    return this;
  }

  /**
   * Set the developer id for the Smite API
   * @param {string} authKey - The developer id for the Smite API
   * @return {SignatureBuilder} the current buider
   */
  withDeveloperId = (developerId) => {
    this.developerId = developerId;
    return this;
  }

  /**
   * Set the method for the Smite API
   * @param {string} authKey - The method for the Smite API
   * @return {SignatureBuilder} the current buider
   */
  withMethod = (method) => {
    this.method = method;
    return this;
  }

  /**
   * Build the signature with the provided developer id, method, and authorization key.
   * @return {string} the MD5 hash of the provided data
   */
  build = () => {
    if (!this.developerId) throw new Error(`Invalid developer id: "${this.developerId}"`);
    if (!this.authKey) throw new Error(`Invalid auth key: "${this.authKey}"`);

    const timestamp = getTimestampUTC();
    return md5(`${this.developerId}${this.method}${this.authKey}${timestamp}`);
  }
}
