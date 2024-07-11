"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full min-w-full flex items-center justify-center">
        <div className="p-16 flex items-center justify-center flex-col">
          <div className="relative w-[80px] h-[80px] text-center flex items-center justify-center">
            <Image src="/logo.png" fill alt="logo" />
          </div>
          <div className="flex gap-10 mt-10 text-black text-[22px] font-bold">
            Ops! parece que o produto que você procura não está disponível no
            momento
          </div>
        </div>
      </div>
      <div className="w-full flex gap-6 justify-center text-teal-500 text-[16px]">
        <div className="flex gap-3">
          <Link href="#" className="text-gray-600">
            @Jibot
          </Link>
        </div>
      </div>
    </main>
  );
}
