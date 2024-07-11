import React from "react";
import { ReactCreditCardsProps } from "react-credit-cards-2";
import Cards from "react-credit-cards-2";

export const DynamicCard = (props: ReactCreditCardsProps) => {
  return <Cards {...props} />;
};
