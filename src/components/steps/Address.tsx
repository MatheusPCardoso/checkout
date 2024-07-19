import { PageProps } from "@/dtos/stepsDto";
import { useForm } from "react-hook-form";
import { InputThemed } from "../InputThemed";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface AddresFormValues {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export const AddressPage = ({
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
        mask={"99999-999"}
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
          className="bg-teal-500 text-white py-2 px-6 rounded text-[12px] flex gap-1 items-center justify-center w-full xl:w-[unset]"
        >
          Avançar
          <MdChevronRight size={16} />
        </button>
      </div>
    </form>
  );
};
