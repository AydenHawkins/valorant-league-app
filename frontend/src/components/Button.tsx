import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "danger";
}

export default function Button({
    children,
    type = "button",
    onClick,
    disabled,
    className,
    variant = "primary",
}: ButtonProps) {
    const variantClass =
        variant === "danger"
            ? "bg-red-600 hover:bg-red-700"
            : "bg-[#25C8FF] hover:bg-[#33E3CC] shadow-[0_0_10px_#25C8FF] hover:shadow-[0_0_15px_#33E3CC]";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`py-2 rounded-md font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className ?? ""}`}
        >
            {children}
        </button>
    );
}
