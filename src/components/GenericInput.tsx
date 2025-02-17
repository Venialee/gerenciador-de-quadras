interface GenericInput {
    id?: string,
    type: any,
    value: string | number,
    label: string,
    placeholder?: string,
    onChange: (type: any) => void
}

export default function GenericInput({ id, type, value, label, placeholder, onChange }: GenericInput) {
    const labelFor = label.charAt(0).toUpperCase() + label.slice(1)

    return (
        <div className="flex flex-col items-center lg:items-start py-[0.3rem]">
            <label htmlFor={label}>{labelFor}:</label>
            <input
                id={id}
                type={type}
                name={label}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                className="border-gray-300 border-solid border-2 rounded-lg w-[100%] p-[0.3rem]" />
        </div>
    );
}
