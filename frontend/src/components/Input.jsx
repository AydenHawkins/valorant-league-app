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
                <label className="text-sm font-medium text-[#89E3FF]">
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`
          px-3 py-2 rounded-md 
          bg-[#1B0252] 
          text-white
          border border-[#A020F0]
          focus:outline-none 
          focus:ring-2 focus:ring-[#FF4BD5]
          focus:border-[#FF4BD5]
          placeholder:text-gray-400
        `}
            />
        </div>
    );
}
