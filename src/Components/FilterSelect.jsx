const FilterSelect = ({
  id,
  value,
  onChange,
  disabled,
  options,
  placeholder,
  loading
}) => {
  return (
    <div className="relative w-full md:w-[30%] lg:w-[15%]">
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={id === "state" ? loading : disabled}
        className={`
        py-2.5 pl-3 pr-8 text-sm rounded-xl outline-none transition-all duration-300
        bg-white/5 border border-white/10 text-slate-300 w-full
        hover:border-sky-500/50 hover:bg-white/10
        disabled:opacity-40 disabled:cursor-not-allowed
        appearance-none cursor-pointer focus:ring-1 focus:ring-sky-500/50
      `}>
        <option value={id === "state" ? "" : "All"} className="bg-[#07111d]">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#07111d]">
            {opt}
          </option>
        ))}
      </select>
      {/* Custom SVG Arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export default FilterSelect;
