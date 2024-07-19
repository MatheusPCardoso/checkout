import { axiosJiBot } from "./axiosJiBot";
import { redirect } from "next/navigation";

export const getPlan = async (planId: string) => {
  try {
    const data = await axiosJiBot.get(`/plans/${planId}`);

    return data.data;
  } catch {
    redirect("/error");
  }
};
