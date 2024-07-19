import { orderDto } from "@/dtos/orderDto";
import { PageProps } from "@/dtos/stepsDto";
import { PiNotePencil } from "react-icons/pi";
import { createOrder } from "@/api/createOrder";
import { useState } from "react";
import { navigate } from "@/utils/navigate";

export const ResumePage = ({
  setPage,
  checkoutValues,
  amount,
  planId,
  customerId,
}: PageProps & {
  amount: number | undefined;
  planId: string;
  customerId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const payload: orderDto = {
      creditCard: {
        card: {
          number: checkoutValues.cardNumber.replaceAll(" ", ""),
          holder_name: checkoutValues.cardName,
          holder_document: checkoutValues.document.replace(/\D/g, ""),
          exp_month: parseInt(
            checkoutValues.cardDate[0] + checkoutValues.cardDate[1]
          ),
          exp_year: parseInt(
            checkoutValues.cardDate[3] + checkoutValues.cardDate[4]
          ),
          cvv: checkoutValues.cardCVV,
        },
      },
      customer: {
        name: checkoutValues.name,
        email: checkoutValues.email,
        code: "",
        phones: {
          home_phone: {
            country_code: "55",
            number: checkoutValues.number,
            area_code: `${checkoutValues.number[1]}${checkoutValues.number[2]}`,
          },
        },
        document: checkoutValues.document.replace(/\D/g, ""),
        type: checkoutValues.document.length < 15 ? "individual" : "company",
        address: {
          street: checkoutValues.street,
          number: checkoutValues.number,
          neighborhood: checkoutValues.neighborhood,
          city: checkoutValues.city,
          state: checkoutValues.state,
          country: "BR",
          complement: "",
          zip_code: checkoutValues.cep,
          line1: checkoutValues.street,
          line2: `${checkoutValues.number} - ${checkoutValues.neighborhood}`,
          metadata: {},
        },
        metadata: {},
      },
      jibotCustomerId: customerId.toString(),
      planId,
    };
    try {
      await createOrder(payload);
    } catch (error) {
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[14px] flex flex-col gap-2">
        <div className="mb-2 flex items-center text-teal-700 justify-between">
          <span className="text-[18px] ">Dados</span>
          <button
            className="flex gap-1 items-center"
            onClick={() => {
              setPage(0);
            }}
          >
            <PiNotePencil />
            Editar
          </button>
        </div>
        <p>
          Nome: <span>{checkoutValues?.name}</span>
        </p>
        <p>
          E-mail: <span>{checkoutValues?.email}</span>
        </p>
        <p>
          Documento: <span>{checkoutValues?.document}</span>
        </p>
        <p>
          Telefone: <span>{checkoutValues?.phone}</span>
        </p>
      </div>
      <hr className="border-teal-500" />
      <div className="text-[14px] flex flex-col gap-2">
        <div className="mb-2 flex items-center text-teal-700 justify-between">
          <span className="text-[18px] text-teal-700">Endereço</span>
          <button
            className="flex gap-1 items-center"
            onClick={() => {
              setPage(1);
            }}
          >
            <PiNotePencil />
            Editar
          </button>
        </div>
        <p>
          Cidade: <span>{checkoutValues?.city}</span>
        </p>
        <p>
          Estado: <span>{checkoutValues?.state}</span>
        </p>
        <p>
          CEP: <span>{checkoutValues?.cep}</span>
        </p>
        <p>
          Rua: <span>{checkoutValues?.street}</span>
        </p>
        <p>
          Número: <span>{checkoutValues?.number}</span>
        </p>
        <p>
          Bairro: <span>{checkoutValues?.neighborhood}</span>
        </p>
      </div>
      <hr className="border-teal-500" />
      <div className="text-[14px] flex flex-col gap-2">
        <div className="mb-2 flex items-center text-teal-700 justify-between">
          <span className="text-[18px] text-teal-700">Pagamento</span>
          <button
            className="flex gap-1 items-center"
            onClick={() => {
              setPage(2);
            }}
          >
            <PiNotePencil />
            Editar
          </button>
        </div>
        <p>
          Número do cartão: <span>{checkoutValues?.cardNumber}</span>
        </p>
        <p>
          Nome no cartão: <span>{checkoutValues?.cardName}</span>
        </p>
        <p>
          Validade do cartão: <span>{checkoutValues?.cardDate}</span>
        </p>
        <p>
          CVC: <span>{checkoutValues?.cardCVV}</span>
        </p>
      </div>
      <button
        className="bg-teal-500 text-white p-3 rounded disabled:opacity-75"
        onClick={handleClick}
        disabled={isLoading}
      >
        Confirmar -
        <span className="font-bold">
          {" " +
            ((amount || 0) / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </span>
      </button>
    </div>
  );
};
