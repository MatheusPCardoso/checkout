import type {
  Control,
  FieldError,
  Merge,
  RegisterOptions,
  UseFormReset,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import type { Props as ReactSelectProps } from "react-select";

import { Select } from "./Select";

interface SelectThemedProps extends ReactSelectProps {
  label?: string;
  control: Control<any, any>;
  name: string;
  validations?: RegisterOptions<any, string>;
  error?: Merge<FieldError, any>;
  reset: UseFormReset<any>;
  options: { value: any; label: string }[];
  isMulti?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const SelectThemed = (props: SelectThemedProps) => {
  const {
    label,
    control,
    name,
    validations,
    error,
    options,
    defaultValue,
    placeholder,
    isDisabled,
    isClearable = true,
  } = props;

  const colourStyles: any = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: !isDisabled ? "white" : "#D9D9D9",
      borderColor: "#e5e7eb",
      fontSize: "16px",
    }),
    option: (styles: any) => ({
      ...styles,
      fontSize: "16px",
      color: "#e5e7eb",
      "@media only screen and (max-width: 1023px)": {
        ...styles["@media only screen and (max-width: 1023px)"],
        fontSize: "12px",
      },
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: "black",
    }),
  };

  const optionsKey = JSON.stringify(options);

  return (
    <div className="flex w-full flex-col gap-[16px]">
      {label && (
        <label htmlFor={name} className="text-[16px]">
          {label}
        </label>
      )}
      <Controller
        key={optionsKey}
        name={name}
        control={control}
        rules={validations}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur } }) => (
          <Select
            {...props}
            options={options}
            onChange={(newValue, actionMeta) => {
              if (props?.onChange) props.onChange(newValue, actionMeta);
              onChange(newValue);
            }}
            onBlur={onBlur}
            styles={colourStyles}
            placeholder={placeholder}
            defaultValue={defaultValue}
            isClearable={isClearable}
          />
        )}
      />

      {error && (
        <span className="mt-[-6px] text-[12px] text-wrong">
          {error.message as unknown as any}
        </span>
      )}
    </div>
  );
};
