import { Dispatch, SetStateAction } from "react";
import { CheckoutValues } from "./checkoutDto";

export interface PageProps {
  setPage: Dispatch<SetStateAction<number>>;
  checkoutValues: CheckoutValues;
  setCheckoutValues: Dispatch<SetStateAction<CheckoutValues>>;
}
