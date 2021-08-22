export const DEVELOPER_ID: string = process.env.DEVELOPER_ID ?? "NOT_FOUND";
export const AUTH_KEY: string = process.env.AUTH_KEY ?? "NOT_FOUND";
export const IS_DEV_ENV: boolean = process.env.NODE_ENV !== "production";
export const BASE_URL: string = IS_DEV_ENV ? "http://localhost:3000" : "<production_url_placeholder>";

console.log(DEVELOPER_ID);
console.log(AUTH_KEY);