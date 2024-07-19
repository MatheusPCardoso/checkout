import { PageProps } from "@/dtos/stepsDto";
import { useForm } from "react-hook-form";
import { InputThemed } from "../InputThemed";
import {
  validateCNPJ,
  validateCPF,
  validateEmail,
  validatePhone,
} from "validations-br";
import { MdChevronRight } from "react-icons/md";

export interface IdentificationFormValues {
  name: string;
  document: string;
  email: string;
  phone: string;
}

export const IdentificationPage = ({
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
          className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center w-full xl:w-[unset]"
        >
          Avançar
          <MdChevronRight size={16} />
        </button>
      </div>
    </form>
  );
};
