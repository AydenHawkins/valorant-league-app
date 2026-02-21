import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "danger" | "outline";
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
            : variant === "outline"
              ? "bg-[#0D0A1A] border border-[#2D1B69] text-[#A5B4FC] hover:border-[#8B5CF6] hover:text-white"
              : "bg-[#60A5FA] hover:bg-[#3B82F6]";

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
