import type { InputHTMLAttributes } from "react";
import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import InputMask from "react-input-mask";

interface InputThemedProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegister<any>;
  name: string;
  validations?: RegisterOptions<any, string>;
  error?: FieldError | undefined;
  mask?: string;
  maskChar?: string;
  textArea?: boolean;
}

export const InputThemed = (props: InputThemedProps) => {
  const { label, register, name, validations, error } = props;

  return (
    <div className="flex flex-col gap-[16px] w-full">
      {label && (
        <label htmlFor={name} className="text-[16px]">
          {label}
        </label>
      )}
      {props.mask ? (
        // @ts-ignore
        <InputMask
          className="w-full rounded-[5px] border-[1px] border-solid  p-[8px] text-[14px]"
          id={name}
          {...register(name, validations)}
          {...props}
        />
      ) : props.textArea ? (
        // @ts-ignore
        <textarea
          className="w-full resize-none rounded-[5px] border-[1px] border-solid border-complement-200 p-[8px] text-[14px]"
          id={name}
          {...register(name, validations)}
          {...props}
          rows={10}
        />
      ) : (
        <input
          className="w-full rounded-[5px] border-[1px] border-solid p-[8px] text-[14px]"
          id={name}
          {...register(name, validations)}
          {...props}
        />
      )}
      {error && (
        <span className="mt-[-6px] text-[12px] text-red-600">
          {error.message}
        </span>
      )}
    </div>
  );
};
