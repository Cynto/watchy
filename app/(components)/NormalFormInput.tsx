
export default function NormalFormInput({type, required, defaultVal, id, name}: {
    type: string,
    required: boolean,
    defaultVal: string
    id: string,
    name:  string
}) {
    return (
        <input type={type} required={required} defaultValue={defaultVal} id={id} name={name}
               className="min-w-full bg-zinc-900  text-gray-100 cursor-text flex text-[0.81rem] h-8 py-1 px-3 w-96 rounded border-[1px] hover:border-[2px] border-zinc-600 focus:outline-none focus:border-[4px] focus:border-red-800"/>
    )
}