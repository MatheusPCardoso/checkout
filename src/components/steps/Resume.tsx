import { createCard } from "@/api/createCard";
import { PageProps } from "@/dtos/stepsDto";
import { PiNotePencil } from "react-icons/pi";

export const ResumePage = ({
  setPage,
  checkoutValues,
  amount,
  planId,
}: PageProps & { amount: number | undefined; planId: string }) => {
  const handleClick = async () => {
    const creditCard = await createCard(
      {
        number: checkoutValues.cardNumber,
        holder_name: checkoutValues.cardName,
        holder_document: checkoutValues.document.replaceAll(/\D/g, ""),
        exp_month: checkoutValues.cardDate[0] + checkoutValues.cardDate[1],
        exp_year: checkoutValues.cardDate[3] + checkoutValues.cardDate[4],
        cvv: checkoutValues.cardCVV,
      },
      "cus_2l9wLywCzotQxoNW"
    );
    console.log({ creditCard });
    /*     const payload = {
      creditCard: {
        card: {
          number: checkoutValues.cardNumber,
          holder_name: checkoutValues.cardName,
          holder_document: checkoutValues.document,
          exp_month: checkoutValues.cardDate[0] + checkoutValues.cardDate[1],
          exp_year: checkoutValues.cardDate[3] + checkoutValues.cardDate[4],
          cvv: checkoutValues.cardCVV,
        },
      },
      customer: {
        name: checkoutValues.name,
        email: checkoutValues.email,
        code: "",
        phones: {
          home_phone: checkoutValues.phone,
        },
        document: checkoutValues.document,
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
      jibotCustomerId: "", //pegar via parametro
      planId,
    }; */
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
        className="bg-teal-500 text-white p-3 rounded"
        onClick={handleClick}
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
