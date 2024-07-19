import Axios from "axios";

const username =
  process.env.NEXT_PUBLIC_QA || process.env.NEXT_PUBLIC_DEV
    ? process.env.NEXT_PUBLIC_PGM_SKEY_TEST
    : process.env.NEXT_PUBLIC_PGM_SKEY_TEST_PGM_SKEY;

const password = "";

const authHeader =
  "Basic " + Buffer.from(`${username}:${password}`).toString("base64");

export const axiosPagarme = Axios.create({
  baseURL: "https://api.pagar.me/core/v5",
  headers: {
    Authorization: authHeader,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
