import { axiosJiBot } from "./axiosJiBot";

export const getPlan = async (
  planId: string,
  redirect: (url: string) => any
) => {
  const data = await axiosJiBot
    .get(`/plans/${planId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      redirect("/error");
    });

  return data;
};
