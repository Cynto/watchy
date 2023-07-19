import { useState, useEffect } from "react";
import NormalFormInput from "@app/(components)/NormalFormInput";
import { MutableRefObject } from "react";

export default function LabelWithInput({
  id,
  name,
  defaultVal,
  type,
  placeholder,
  required,
  innerRef,
  inputError,
  handleChange,
}: {
  id: string;
  name: string;
  defaultVal?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  innerRef?: MutableRefObject<HTMLInputElement | null>;
  inputError: string;
  handleChange?: Function;
}) {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setError(inputError);
  }, [inputError, error, id]);
  return (
    <div className="text-gray-100  text-[0.81rem] grid grid-cols-1 gap-2">
      <label htmlFor={id} className="text-neutral-100 font-bold">
        {name}
      </label>
      <NormalFormInput
        innerRef={innerRef}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultVal={defaultVal}
        id={id}
        name={id}
        handleChange={handleChange}
      />
      {error && <p className={"text-red-800 text-sm"}>{error}</p>}
    </div>
  );
}
