import md5 from "md5";
import {
  SMITE_BASE_URL,
  SmiteContentType,
  SmiteLanguageCode,
  SmiteMethod,
} from "./smite.constants";

/**
 * Returns the UTC timestamp in yyyyMMddHHmmss format.
 * @returns the UTC timestampin yyyyMMddHHmmss format.
 */
export const getTimestampUTC = () => {
  const now = new Date();
  const year = `${now.getUTCFullYear()}`.padStart(4, "0");
  const month = `${now.getUTCMonth() + 1}`.padStart(2, "0"); // Zero-indexed
  const date = `${now.getUTCDate()}`.padStart(2, "0");
  const hours = `${now.getUTCHours()}`.padStart(2, "0");
  const minutes = `${now.getUTCMinutes()}`.padStart(2, "0");
  const seconds = `${now.getUTCSeconds()}`.padStart(2, "0");
  return `${year}${month}${date}${hours}${minutes}${seconds}`;
};

export const getSignature = (method: SmiteMethod): string => {
  const developerId = process.env.SMITE_DEVELOPER_ID;
  const authKey = process.env.SMITE_AUTH_KEY;
  const timestamp = getTimestampUTC();
  return md5(`${developerId}${method}${authKey}${timestamp}`);
};

export const formatRequestURL = ({
  method,
  sessionId,
}:
  | {
      method: SmiteMethod;
      sessionId: string;
    }
  | {
      method: SmiteMethod.CREATE_SESSION;
      sessionId?: undefined;
    }): URL => {
  const developerId = process.env.SMITE_DEVELOPER_ID;
  const signature = getSignature(method);
  const timestamp = getTimestampUTC();
  const sessionSegment = sessionId ? `/${sessionId}` : "";
  const languageCodeSegment =
    method === SmiteMethod.CREATE_SESSION || method === SmiteMethod.TEST_SESSION
      ? ""
      : `/${SmiteLanguageCode.ENGLISH}`;
  return new URL(
    `${SMITE_BASE_URL}/${method}${SmiteContentType.JSON}/${developerId}/${signature}${sessionSegment}/${timestamp}${languageCodeSegment}`,
  );
};
