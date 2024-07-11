"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { InputThemed } from "./InputThemed";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { PiNotePencil } from "react-icons/pi";

import {
  validateCNPJ,
  validateCPF,
  validateEmail,
  validatePhone,
} from "validations-br";

import { Focused } from "react-credit-cards-2";
import dynamic from "next/dynamic";
import { SelectThemed } from "./SelectThemed";
import Link from "next/link";

interface IdentificationFormValues {
  name: string;
  document: string;
  email: string;
  phone: string;
}

interface AddresFormValues {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface PaymentFormValues {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCVC: string;
  tranches: { label: string; value: string };
}

interface CheckoutValues
  extends IdentificationFormValues,
    AddresFormValues,
    PaymentFormValues {}

interface PageProps {
  setPage: Dispatch<SetStateAction<number>>;
  checkoutValues: CheckoutValues;
  setCheckoutValues: Dispatch<SetStateAction<CheckoutValues>>;
}

const DynamicCard = dynamic(() =>
  import("./DynamicCard").then((mod) => mod.DynamicCard)
);

const IdentificationPage = ({
  setPage,
  setCheckoutValues,
  checkoutValues,
}: PageProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IdentificationFormValues>();

  const onSubmit = (values: IdentificationFormValues) => {
    setCheckoutValues((prev) => ({ ...prev, ...values }));
    setPage((prev) => prev + 1);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6 w-full">
        <InputThemed
          register={register}
          name={"name"}
          placeholder="Jhon Doe"
          label="Nome Completo"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.name}
          error={errors.name}
        />
        <InputThemed
          register={register}
          name={"email"}
          placeholder="email@email.com"
          label="E-mail"
          validations={{
            validate: (value: string) => {
              return validateEmail(value) || "E-mail inválido";
            },
          }}
          defaultValue={checkoutValues?.email}
          error={errors.email}
        />
      </div>
      <InputThemed
        register={register}
        name={"document"}
        mask={
          watch("document")?.length < 15
            ? "999.999.999-999"
            : "99.999.999/9999-99"
        }
        maskChar=""
        placeholder="000.000.000-00"
        validations={{
          validate: (value: string) => {
            if (!value) return "Documento inválido";
            if (value.length < 15) {
              return validateCPF(value) || "CPF inválido";
            }
            return validateCNPJ(value) || "CNPJ inválido";
          },
        }}
        label="CPF ou CNPJ"
        defaultValue={checkoutValues?.document}
        error={errors.document}
      />
      <InputThemed
        register={register}
        name={"phone"}
        placeholder="(00) 0 0000-0000"
        label="Telefone"
        mask="(99) 9 9999-9999"
        minLength={16}
        validations={{
          validate: (value: string) => {
            return validatePhone(value) || "Telefone inválido";
          },
        }}
        defaultValue={checkoutValues?.phone}
        error={errors.phone}
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center"
        >
          Avançar
          <MdChevronRight size={16} />
        </button>
      </div>
    </form>
  );
};

const AddressPage = ({
  setPage,
  setCheckoutValues,
  checkoutValues,
}: PageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddresFormValues>();

  const onSubmit = (values: AddresFormValues) => {
    setCheckoutValues((prev) => ({ ...prev, ...values }));
    setPage((prev) => prev + 1);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <InputThemed
          register={register}
          name={"city"}
          label="Cidade"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.city}
          error={errors.city}
        />
        <InputThemed
          register={register}
          name={"state"}
          label="Estado"
          mask="aa"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.state}
          error={errors.state}
        />
      </div>
      <InputThemed
        register={register}
        name={"cep"}
        mask={"9999-999"}
        validations={{ required: "Campo obrigatório" }}
        label="CEP"
        defaultValue={checkoutValues?.cep}
        error={errors.cep}
      />
      <Link
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        className="text-[12px] mt-[-10px] underline text-teal-500"
      >
        Não seu meu CEP
      </Link>
      <InputThemed
        register={register}
        name={"street"}
        validations={{ required: "Campo obrigatório" }}
        label="Rua"
        defaultValue={checkoutValues?.street}
        error={errors.street}
      />
      <div className="flex gap-6">
        <InputThemed
          register={register}
          name={"number"}
          label="Número"
          type="number"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.number}
          error={errors.number}
        />
        <InputThemed
          register={register}
          name={"neighborhood"}
          label="Bairro"
          validations={{ required: "Campo obrigatório" }}
          defaultValue={checkoutValues?.neighborhood}
          error={errors.neighborhood}
        />
      </div>
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
          className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center"
        >
          Avançar
          <MdChevronRight size={16} />
        </button>
      </div>
    </form>
  );
};

const PaymentPage = ({
  setPage,
  setCheckoutValues,
  checkoutValues,
}: PageProps) => {
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
        cvc={cardValues.cvc || checkoutValues.cardCVC}
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
            name={"cardCVC"}
            label="CVC"
            mask="999"
            validations={{ required: "Campo obrigatório" }}
            defaultValue={checkoutValues?.cardCVC}
            error={errors.cardCVC}
          />
        </div>
        <SelectThemed
          name={"tranches"}
          control={control}
          reset={reset}
          placeholder="parcelas"
          label="Pagamento"
          value={{ label: "1x de R$ 29,99", value: "adada" }}
          options={[{ label: "1x de R$ 29,99", value: "adada" }]}
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
            className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center"
          >
            Avançar
            <MdChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

const ResumePage = ({
  setPage,
  checkoutValues,
  amount,
}: PageProps & { amount: number | undefined }) => {
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
          CVC: <span>{checkoutValues?.cardCVC}</span>
        </p>
      </div>
      <button className="bg-teal-500 text-white p-3 rounded">
        Confirmar -
        <span className="font-bold">{` R$${(amount || 0) / 100}`}</span>
      </button>
    </div>
  );
};

export const Checkout = ({ amount }: { amount: number | undefined }) => {
  const [page, setPage] = useState(0);
  const [checkoutValues, setCheckoutValues] = useState<CheckoutValues>({
    document: "",
    email: "",
    name: "",
    phone: "",
    cep: "",
    city: "",
    neighborhood: "",
    number: "",
    state: "",
    street: "",
    cardCVC: "",
    cardDate: "",
    cardName: "",
    cardNumber: "",
    tranches: {
      label: "",
      value: "",
    },
  });

  const pages = [
    {
      component: (
        <IdentificationPage
          key={0}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
        />
      ),
      itemName: "Seus Dados",
    },
    {
      component: (
        <AddressPage
          key={1}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
        />
      ),
      itemName: "Seu Endereço",
    },
    {
      component: (
        <PaymentPage
          key={2}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
        />
      ),
      itemName: "Pagamento",
    },
    {
      component: (
        <ResumePage
          key={2}
          setPage={setPage}
          checkoutValues={checkoutValues}
          setCheckoutValues={setCheckoutValues}
          amount={amount}
        />
      ),
      itemName: "Resumo",
    },
  ];
  return (
    <div className="bg-white px-4 py-6 rounded shadow-lg min-w-[620px]">
      <div className="flex justify-between mb-10 border-solid border-teal-500 border-[1px] p-4 rounded text-white">
        {pages.map((item, index) => (
          <div
            key={item.itemName}
            className={
              "flex gap-1 items-center text-black" +
              (page === index ? " text-teal-600" : "")
            }
          >
            {item.itemName}{" "}
            {!(index === pages.length - 1) && <MdChevronRight size={16} />}
          </div>
        ))}
      </div>
      {pages[page].component}
    </div>
  );
};
