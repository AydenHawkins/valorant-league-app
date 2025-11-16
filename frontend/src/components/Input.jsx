export default function Input({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="px-3 py-2 border border-gray-300 rounded-md
                   shadow-sm focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
}
