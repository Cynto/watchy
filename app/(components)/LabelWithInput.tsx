import NormalFormInput from "@app/(components)/NormalFormInput";
import {MutableRefObject} from "react";

export default function LabelWithInput({
    id,
    name,
    defaultVal,
    type,
    placeholder,
    required,
    innerRef
                                       }: {
    id: string,
    name: string,
    defaultVal?: string,
    type: string,
    placeholder?: string,
    required?: boolean
    innerRef?: MutableRefObject<HTMLInputElement | null>

}) {
    return (
        <div className="text-gray-100  text-[0.81rem] grid grid-cols-1 gap-2">
            <label htmlFor={id} className="text-neutral-100 font-bold">{name}</label>
            <NormalFormInput innerRef={innerRef} type={type} required={required} placeholder={placeholder} defaultVal={defaultVal} id={id} name={id} />
        </div>
    )
}