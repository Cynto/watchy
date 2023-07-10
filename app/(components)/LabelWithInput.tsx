import NormalFormInput from "@app/(components)/NormalFormInput";

export default function LabelWithInput({
    id,
    name,
    defaultVal,
    type,
    placeholder,
    required
                                       }: {
    id: string,
    name: string,
    defaultVal?: string,
    type: string,
    placeholder?: string,
    required?: boolean

}) {
    return (
        <div className="text-gray-100  text-[0.81rem] grid grid-cols-1 gap-2">
            <label htmlFor={id} className="text-neutral-100 font-bold">{name}</label>
            <NormalFormInput type={type} required={required} placeholder={placeholder} defaultVal={defaultVal} id={id} name={id} />
        </div>
    )
}