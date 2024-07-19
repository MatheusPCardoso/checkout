import Axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_DEV
  ? process.env.NEXT_PUBLIC_BASE_URL_DEV
  : process.env.NEXT_PUBLIC_QA
  ? process.env.NEXT_PUBLIC_BASE_URL_QA
  : process.env.NEXT_PUBLIC_PROD
  ? process.env.NEXT_PUBLIC_BASE_URL_PROD
  : "";

export const axiosJiBot = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
