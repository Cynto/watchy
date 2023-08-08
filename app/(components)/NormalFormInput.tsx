import { RefObject } from 'react';

export default function NormalFormInput({
  type,
  required,
  defaultVal,
  placeholder,
  id,
  name,
  width,
  innerRef,
  handleChange,
}: {
  type: string;
  required?: boolean;
  defaultVal?: string;
  placeholder?: string;
  id: string;
  name: string;
  width?: string;
  innerRef?: RefObject<HTMLInputElement>;
  handleChange?: Function;
}) {
  return (
    <input
      type={type}
      required={required}
      defaultValue={defaultVal}
      id={id}
      name={name}
      placeholder={placeholder}
      onBlur={() =>
        handleChange !== undefined ? handleChange(innerRef) : () => {}
      }
      ref={innerRef}
      className={`${
        width ? width : 'w-full'
      } bg-zinc-900  text-gray-100 cursor-text flex text-[0.81rem] h-8 py-1 px-3 w-96 rounded border-[1px] hover:border-[2px] border-zinc-600 focus:outline-none focus:border-[4px] focus:border-red-800`}
    />
  );
}
