import { PageProps } from "@/dtos/stepsDto";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Focused } from "react-credit-cards-2";
import { useForm } from "react-hook-form";
import { InputThemed } from "../InputThemed";
import { SelectThemed } from "../SelectThemed";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const DynamicCard = dynamic(() =>
  import("../DynamicCard").then((mod) => mod.DynamicCard)
);

export interface PaymentFormValues {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCVV: string;
  tranches: { label: string; value: string };
}

export const PaymentPage = ({
  setPage,
  setCheckoutValues,
  checkoutValues,
  amount,
}: PageProps & { amount: number | undefined }) => {
  const [focused, setFocused] = useState<Focused>("name");
  const [cardValues, setCardValues] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PaymentFormValues>();

  const onSubmit = (values: PaymentFormValues) => {
    setCheckoutValues((prev) => ({ ...prev, ...values }));
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <DynamicCard
        number={cardValues.number || checkoutValues.cardNumber}
        expiry={cardValues.expiry || checkoutValues.cardDate}
        cvc={cardValues.cvc || checkoutValues.cardCVV}
        name={cardValues.name || checkoutValues.cardName}
        focused={focused}
        placeholders={{ name: "SEU NOME" }}
        locale={{ valid: "Validade" }}
      />
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <InputThemed
          register={register}
          onChange={(e) => {
            setCardValues((prev) => ({ ...prev, number: e.target.value }));
            setFocused("number");
          }}
          name={"cardNumber"}
          mask="9999 9999 9999 9999"
          label="Número do cartão"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.cardNumber}
          error={errors.cardNumber}
        />
        <InputThemed
          register={register}
          onChange={(e) => {
            setCardValues((prev) => ({ ...prev, name: e.target.value }));
            setFocused("name");
          }}
          name={"cardName"}
          label="Nome no cartão"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.cardName}
          error={errors.cardName}
        />
        <div className="flex gap-6">
          <InputThemed
            register={register}
            onChange={(e) => {
              setCardValues((prev) => ({ ...prev, expiry: e.target.value }));
              setFocused("expiry");
            }}
            name={"cardDate"}
            mask="99/99"
            label="Validade"
            validations={{ required: "Campo obrigatório" }}
            defaultValue={checkoutValues?.cardDate}
            error={errors.cardDate}
          />
          <InputThemed
            register={register}
            onChange={(e) => {
              setCardValues((prev) => ({ ...prev, cvc: e.target.value }));
              setFocused("cvc");
            }}
            name={"cardCVV"}
            label="CVC"
            mask="999"
            validations={{ required: "Campo obrigatório" }}
            defaultValue={checkoutValues?.cardCVV}
            error={errors.cardCVV}
          />
        </div>
        <SelectThemed
          name={"tranches"}
          control={control}
          reset={reset}
          placeholder="parcelas"
          label="Pagamento"
          // feito assim pra facilitar parcelamentos futuros
          value={{
            label: `1x de ${((amount || 0) / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`,
            value: "poggers",
          }}
          options={[
            {
              label: `1x de ${((amount || 0) / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}`,
              value: "poggers",
            },
          ]}
        />
        <div className="w-full flex justify-end gap-6">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className=" text-teal-800 py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center"
          >
            <MdChevronLeft size={16} />
            Voltar
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center w-full xl:w-[unset]"
          >
            Avançar
            <MdChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
