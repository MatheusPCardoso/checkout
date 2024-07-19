"use client";

import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { IdentificationPage } from "./steps/Identification";
import { CheckoutValues } from "@/dtos/checkoutDto";
import { AddressPage } from "./steps/Address";
import { PaymentPage } from "./steps/Payment";
import { ResumePage } from "./steps/Resume";

export const Checkout = ({
  amount,
  planId,
}: {
  amount: number | undefined;
  planId: string;
}) => {
  const [page, setPage] = useState(0);
  const [checkoutValues, setCheckoutValues] = useState<CheckoutValues>({
    document: "",
    email: "",
    name: "",
    phone: "",
    cep: "",
    city: "",
    neighborhood: "",
    number: "",
    state: "",
    street: "",
    cardCVV: "",
    cardDate: "",
    cardName: "",
    cardNumber: "",
    tranches: {
      label: "",
      value: "",
    },
  });

  const pages = [
    {
      component: (
        <IdentificationPage
          key={0}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
        />
      ),
      itemName: "Seus Dados",
    },
    {
      component: (
        <AddressPage
          key={1}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
        />
      ),
      itemName: "Seu Endereço",
    },
    {
      component: (
        <PaymentPage
          key={2}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
          amount={amount}
        />
      ),
      itemName: "Pagamento",
    },
    {
      component: (
        <ResumePage
          key={2}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
          amount={amount}
          planId={planId}
        />
      ),
      itemName: "Resumo",
    },
  ];
  return (
    <div className="bg-white px-4 py-6 rounded shadow-lg xl:min-w-[620px]">
      <div className="xl:flex hidden justify-between mb-10 border-solid border-teal-500 border-[1px] p-4 rounded text-white">
        {pages.map((item, index) => (
          <div
            key={item.itemName}
            className={
              "flex gap-1 items-center text-black" +
              (page === index ? " text-teal-600" : "")
            }
          >
            {item.itemName}{" "}
            {!(index === pages.length - 1) && <MdChevronRight size={16} />}
          </div>
        ))}
      </div>
      {pages[page].component}
    </div>
  );
};
