import * as jwt from "jsonwebtoken";

export interface TokenData {
  planId: string;
  customerId: string;
}

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export const generate = (data: TokenData): string => {
  return jwt.sign(data, secret || "");
};

export const verify = (token: string): TokenData => {
  return jwt.verify(token, secret || "") as TokenData;
};
