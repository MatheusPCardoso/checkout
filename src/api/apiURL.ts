export const apiUrl = process.env.NEXT_PUBLIC_DEV
  ? process.env.NEXT_PUBLIC_BASE_URL_DEV
  : process.env.NEXT_PUBLIC_QA
  ? process.env.NEXT_PUBLIC_BASE_URL_QA
  : process.env.NEXT_PUBLIC_PROD
  ? process.env.NEXT_PUBLIC_BASE_URL_PROD
  : "";
