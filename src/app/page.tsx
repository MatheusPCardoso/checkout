import { Checkout } from "@/components/Checkout";
import { GoShieldCheck } from "react-icons/go";

import Image from "next/image";
import Link from "next/link";
import { PaymentData } from "@/components/PaymentData";
import { redirect } from "next/navigation";
import { getPlan } from "@/api/getPlan";
import { verify } from "@/utils/jwt";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.token) redirect("/404");
  const { planId, customerId } = verify(searchParams.token as string);
  if (!planId || !customerId) redirect("/404");
  const data = await getPlan(planId);
  return (
    <main>
      <div className="w-full min-w-full flex items-center justify-center">
        <div className="pt-16 px-6 xl:p-16 flex items-center justify-center flex-col w-full xl:w-[unset]">
          <div className="relative w-[80px] h-[80px] text-center flex items-center justify-center">
            <Image src="/logo.png" fill alt="logo" />
          </div>
          <div className="flex flex-col w-full xl:flex-row gap-10 mt-10">
            <Checkout
              amount={data.amount}
              customerId={customerId}
              planId={planId}
            />
            <PaymentData data={data} />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 justify-center text-teal-500 text-[16px] py-8 xl:py-0">
        <div className="flex gap-3">
          <Link
            href="https://www.instagram.com/jibotapp"
            className="text-gray-600"
          >
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
