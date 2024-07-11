"use client";

import { CiImageOn } from "react-icons/ci";
import { PlansDto } from "@/dtos/plansDto";

interface PaymentDataProps {
  data: PlansDto;
}

export const PaymentData = ({ data }: PaymentDataProps) => {
  return (
    <div className="bg-white px-4 py-6 rounded shadow-lg min-w-[320px]">
      <div>
        <div className="w-full flex justify-between items-center">
          <div>
            <p className="text-teal-600 text-[18px]">{data.name}</p>
            <p className="text-gray-600 text-[14px]">{data.description}</p>
          </div>
          <div className="text-teal-600">
            <CiImageOn size={60} />
          </div>
        </div>
        <div className="flex justify-between mt-8 w-full">
          <p className="text-teal-600">Valor:</p>
          <p className="text-black font-bold">{`R$ ${data.amount / 100}`}</p>
        </div>
      </div>
    </div>
  );
};
