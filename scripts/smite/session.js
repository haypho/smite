import fs from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { SignatureBuilder, SmiteMethod, SmiteContentType, getTimestampUTC, SmiteBaseURL } from "./utils";

export class Session {
  static environmentKey = "SESSION_ID";
  static id = "11DA4B0A2D624B6D8E941075F0B7DD5A";

  static _fetchSession = async () => {
    const developerId = process.env.DEVELOPER_ID;
    const authKey = process.env.AUTH_KEY;
    const signature = new SignatureBuilder()
      .withDeveloperId(developerId)
      .withAuthKey(authKey)
      .withMethod(SmiteMethod.CREATE_SESSION)
      .build();
    const timestamp = getTimestampUTC();
    const url = `${SmiteBaseURL}/${SmiteMethod.CREATE_SESSION}${SmiteContentType}/${developerId}/${signature}/${timestamp}`;
    const res = await axios.get(url);
    const { session_id: sessionId, ret_msg: returnMessage } = res.data;
    if (!sessionId || returnMessage !== "Approved") {
      throw new Error(`Unable to fetch session: ${returnMessage}`);
    }
    return sessionId;
  }

  static _writeSessionToEnv = (sessionId) => {
    const envFilepath = path.resolve(__dirname, "../../.env.development.local");
    if (fs.existsSync(envFilepath)) {
      const fileContents = fs.readFileSync(envFilepath);
      const config = dotenv.parse(fileContents);
      config[Session.environmentKey] = sessionId;
      const newFileContents = Object.entries(config).map(([key, value]) => `${key}=${value}`).join("\n");
      fs.writeFileSync(envFilepath, newFileContents);
    }
  }

  static _updateSession = async () => {
    const sessionId = await Session._fetchSession();
    Session._writeSessionToEnv(sessionId);
    process.env[Session.environmentKey] = sessionId;
    this.id = sessionId;
    return sessionId;
  }

  static _isSessionIdValid = async (sessionId) => {
    const developerId = process.env.DEVELOPER_ID;
    const authKey = process.env.AUTH_KEY;
    const signature = new SignatureBuilder()
      .withDeveloperId(developerId)
      .withAuthKey(authKey)
      .withMethod(SmiteMethod.TEST_SESSION)
      .build();
    const timestamp = getTimestampUTC();
    const url = `${SmiteBaseURL}/${SmiteMethod.TEST_SESSION}${SmiteContentType}/${developerId}/${signature}/${sessionId}/${timestamp}`;
    const res = await axios.get(url);
    return !res.data.startsWith("Failed");
  }

  static getAsync = async () => {
    if (Session.id) {
      if (Session._isSessionIdValid(Session.id)) {
        return Session.id;
      }
    } else if (process.env[Session.environmentKey]) {
      if (Session._isSessionIdValid(process.env[Session.environmentKey])) {
        return process.env[Session.environmentKey];
      }
    }
    const sessionId = await Session._updateSession();
    return sessionId;
  }
}
