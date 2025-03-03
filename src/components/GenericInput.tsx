'use client'

import { ReactElement } from "react";

interface GenericInputProps {
    id?: string,
    type: string,
    value: string | number,
    label: string,
    placeholder?: string,
    onChange: (value: string) => void,
    mandatory?: boolean,
    icon?: ReactElement,
    variant?: 'default' | 'editReserva'
}

export default function GenericInput({ id, type, value, label, placeholder, onChange, mandatory = false, icon, variant = 'default' }: GenericInputProps) {
    const labelFor = label.charAt(0).toUpperCase() + label.slice(1);

    const inputClasses = variant === 'editReserva'
        ? 'bg-white border-gray-300 text-darkBlue'
        : 'bg-backgroundYellow border-complementYellow text-darkBlue';

    return (
        <div className="flex flex-col lg:items-start py-[0.3rem]">
            <label htmlFor={label} className="text-darkBlue font-bold">{labelFor}<span className="text-red-500">{mandatory ? '*' : ''}</span></label>
            <div className="relative w-full">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                <input
                    id={id}
                    type={type}
                    name={label}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    className={`border-solid border-2 rounded-sm w-full h-12 p-[0.3rem] my-2 placeholder-darkBlue ${icon ? 'pl-10' : ''} ${inputClasses}`} />
            </div>
        </div>
    );
}