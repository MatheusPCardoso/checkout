import { Checkout } from "@/components/Checkout";
import { GoShieldCheck } from "react-icons/go";

import Image from "next/image";
import Link from "next/link";
import { PaymentData } from "@/components/PaymentData";
import { apiUrl } from "@/api/apiURL";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await fetch(apiUrl + `/plans/${searchParams.planId}`)
    .then((response) => {
      if (!response.ok) throw new Error("API request failed");

      return response.json();
    })
    .catch(() => {
      redirect("/error");
    });

  return (
    <main>
      <div className="w-full min-w-full flex items-center justify-center">
        <div className="p-16 flex items-center justify-center flex-col">
          <div className="relative w-[80px] h-[80px] text-center flex items-center justify-center">
            <Image src="/logo.png" fill alt="logo" />
          </div>
          <div className="flex gap-10 mt-10">
            <Checkout amount={data.amount} />
            <PaymentData data={data} />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 justify-center text-teal-500 text-[16px]">
        <div className="flex gap-3">
          <Link href="https://www.instagram.com/jibotapp" className="text-gray-600">
            @JibotApp
          </Link>
        </div>
        <div className="flex gap-3">
          <GoShieldCheck size={24} />
          <span>Seguro</span>
        </div>
      </div>
    </main>
  );
}
