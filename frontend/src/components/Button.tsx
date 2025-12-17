import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    children,
    type = "button",
    onClick,
    disabled,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full py-2 rounded-md font-semibold
        text-white
        bg-[#25C8FF]
        hover:bg-[#33E3CC]
        shadow-[0_0_10px_#25C8FF]
        hover:shadow-[0_0_15px_#33E3CC]
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
        >
            {children}
        </button>
    );
}
