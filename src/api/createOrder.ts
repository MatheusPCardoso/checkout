import { orderDto } from "@/dtos/orderDto";
import { axiosJiBot } from "./axiosJiBot";

export const createOrder = async (
  orderPayload: orderDto,
  redirect: (url: string) => any
) => {
  const data = await axiosJiBot
    .post("/payments/order", orderPayload)
    .then((response) => {
      redirect("/waiting");
      return response.data;
    })
    .catch(() => {
      redirect("/error");
    });

  return data;
};
