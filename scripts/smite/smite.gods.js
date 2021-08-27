import axios from "axios";
import fs from "fs";
import path from "path";
import { Session } from "./session";
import {
  SignatureBuilder,
  getTimestampUTC,
  SmiteContentType,
  SmiteBaseURL,
  SmiteMethod,
  SmiteLanguageCode
} from "./utils";

export class SmiteGods {
  static fetchAll = async () => {
    const developerId = process.env.DEVELOPER_ID;
    const authKey = process.env.AUTH_KEY;
    const signature = new SignatureBuilder()
      .withDeveloperId(developerId)
      .withAuthKey(authKey)
      .withMethod(SmiteMethod.GET_GODS)
      .build();
    const timestamp = getTimestampUTC();
    const sessionId = await Session.getAsync();
    const url = `${SmiteBaseURL}/${SmiteMethod.GET_GODS}${SmiteContentType}/${developerId}/${signature}/${sessionId}/${timestamp}/${SmiteLanguageCode.ENGLISH}`;
    const res = await axios.get(url);
    return res.data;
  }

  static persist = (gods) => {
    const assetFilepath = path.resolve(__dirname, "../../assets/gods.json");
    fs.writeFileSync(assetFilepath, JSON.stringify(gods, undefined, 2), { encoding: "utf-8" });
    console.log("Persisted gods to:", assetFilepath);
  }
}
