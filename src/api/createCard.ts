import { toast } from "react-toastify";
import { axiosPagarme } from "./axiosPagarme";

interface CreditCard {
  number: string;
  holder_name: string;
  holder_document: string;
  exp_month: string;
  exp_year: string;
  cvv: string;
}

export const createCard = async (
  creditCard: CreditCard,
  customerId = "cus_2l9wLywCzotQxoNW"
) => {
  const data = await axiosPagarme
    .post(`/customers/${customerId}/cards`, creditCard)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return toast.error(
        "Não foi possivel validar seu cartão, tente novamente mais tarde!"
      );
    });
  return;
};
