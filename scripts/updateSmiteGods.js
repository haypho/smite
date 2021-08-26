const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({
  path: path.resolve(__dirname, '../.env.development.local'),
});

const DEVELOPER_ID = process.env.DEVELOPER_ID;
const AUTH_KEY = process.env.AUTH_KEY;
const SMITE_BASE_URL = 'https://api.smitegame.com/smiteapi.svc';
const SMITE_CONTENT_TYPE = 'JSON';
const SMITE_LANGUAGE_CODE = '1';

function getTimestampUTC() {
  const now = new Date();
  const year = `${now.getUTCFullYear()}`.padStart(4, '0');
  const month = `${now.getUTCMonth() + 1}`.padStart(2, '0'); // Zero-indexed
  const date = `${now.getUTCDate()}`.padStart(2, '0');
  const hours = `${now.getUTCHours()}`.padStart(2, '0');
  const minutes = `${now.getUTCMinutes()}`.padStart(2, '0');
  const seconds = `${now.getUTCSeconds()}`.padStart(2, '0');
  return `${year}${month}${date}${hours}${minutes}${seconds}`;
}

function getSignature(method) {
  const timestamp = getTimestampUTC();
  return md5(`${DEVELOPER_ID}${method}${AUTH_KEY}${timestamp}`);
}

async function getSessionAsync() {
  const method = "createsession";
  const signature = getSignature(method);
  const timestamp = getTimestampUTC();
  const url = `${SMITE_BASE_URL}/${method}${SMITE_CONTENT_TYPE}/${DEVELOPER_ID}/${signature}/${timestamp}`;
  const res = await axios.get(url);
  const { session_id: sessionId, ret_msg: returnMessage } = res.data;
  if (!sessionId || returnMessage !== "Approved") {
    throw new Error(`Session ID: "${sessionId}" ${returnMessage}`);
  }
  return sessionId;
}

async function getGods() {
  const method = "getgods";
  const signature = getSignature(method);
  const timestamp = getTimestampUTC();
  const sessionId = await getSessionAsync();
  const url = `${SMITE_BASE_URL}/${method}${SMITE_CONTENT_TYPE}/${DEVELOPER_ID}/${signature}/${sessionId}/${timestamp}/${SMITE_LANGUAGE_CODE}`;
  const res = await axios.get(url);
  return res.data;
}

async function main() {
  const filepath = path.resolve(__dirname, '../assets/gods.json');
  const gods = await getGods();
  fs.writeFileSync(filepath, JSON.stringify(gods, undefined, 2), { encoding: 'utf-8' });
}

main();