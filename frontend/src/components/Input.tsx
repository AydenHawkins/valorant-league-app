import { ReactNode } from "react";

interface InputProps {
    label?: string;
    labelRight?: string;
    icon?: ReactNode;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Input({
    label,
    labelRight,
    icon,
    type = "text",
    value,
    onChange,
    placeholder,
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {(label || labelRight) && (
                <div className="flex justify-between items-center">
                    {label && (
                        <label className="text-xs font-bold tracking-widest text-[#A5B4FC] uppercase">
                            {label}
                        </label>
                    )}
                    {labelRight && (
                        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                            {labelRight}
                        </span>
                    )}
                </div>
            )}

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-3 flex items-center text-gray-500 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full py-3 pr-3 rounded-md bg-[#0D0A1A] text-white border border-[#2D1B69] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] placeholder:text-gray-600 ${icon ? "pl-10" : "pl-3"}`}
                />
            </div>
        </div>
    );
}
