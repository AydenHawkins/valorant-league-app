export default function Button({
    children,
    type = "button",
    onClick,
    disabled,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md font-medium text-white
                 bg-blue-600 hover:bg-blue-700 transition
                 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    );
}
