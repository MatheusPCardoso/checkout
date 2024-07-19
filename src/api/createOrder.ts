import { orderDto } from "@/dtos/orderDto";
import { axiosJiBot } from "./axiosJiBot";
import { navigate } from "@/utils/navigate";

export const createOrder = async (orderPayload: orderDto) => {
  try {
    const data = await axiosJiBot.post("/payments/order", orderPayload);
    navigate("/waiting");
    return data.data;
  } catch {
    navigate("/error");
  }
};
