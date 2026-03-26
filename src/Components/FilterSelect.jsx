import React, { useMemo } from "react";
import Select from "react-select";

const FilterSelect = ({
  id,
  value,
  onChange,
  disabled,
  options = [],
  placeholder,
  loading,
}) => {
  // 1. formatted options arr
  const formattedOptions = useMemo(() => {
    const baseOptions = (options || []).map((opt) => ({
      value: opt,
      label: opt
        .toString()
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    return [
      { value: id === "state" ? "" : "All", label: placeholder },
      ...baseOptions,
    ];
  }, [options, id, placeholder]);

  const selectedOption = useMemo(
    () => formattedOptions.find((option) => option.value === value) || null,
    [formattedOptions, value],
  );

  // 2. Search Logic: includes and Fist Letter forEach word in async search
  const customFilter = (option, inputValue) => {
    if (!inputValue) return true;
    const label = option.label.toLowerCase();
    const search = inputValue.toLowerCase();

    if (label.includes(search)) return true;

    const acronym = option.label
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toLowerCase();

    return acronym.includes(search);
  };

  // 3. Styles
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: state.isFocused
        ? "rgba(14, 165, 233, 0.5)"
        : "rgba(255, 255, 255, 0.1)",
      borderRadius: "0.75rem",
      minHeight: "42px",
      boxShadow: state.isFocused ? "0 0 0 1px rgba(14, 165, 233, 0.5)" : "none",
      opacity: state.isDisabled ? 0.4 : 1,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      transition: "all 300ms",
      "&:hover": {
        borderColor: "rgba(14, 165, 233, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#07111d",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.75rem",
      overflow: "hidden",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#0ea5e9"
        : isFocused
          ? "rgba(255, 255, 255, 0.1)"
          : "transparent",
      color: "#cbd5e1",
      cursor: "pointer",
      fontSize: "0.875rem",
      "&:active": { backgroundColor: "#0ea5e9" },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#cbd5e1",
      fontSize: "0.875rem",
    }),
    input: (base) => ({ ...base, color: "#cbd5e1" }),
    placeholder: (base) => ({
      ...base,
      color: "#64748b",
      fontSize: "0.875rem",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#64748b",
      "&:hover": { color: "#cbd5e1" },
    }),
  };

  return (
    <div className="w-full md:w-[30%] lg:w-[15%]">
      <Select
        id={id}
        instanceId={`select-${id}`}
        options={formattedOptions}
        value={selectedOption}
        //disabled logic:
        isDisabled={id === "state" ? loading : disabled}
        placeholder={placeholder}
        isSearchable
        filterOption={customFilter}
        styles={customStyles}
        // Fixed: No cascading render warning
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        menuPosition="fixed"
        onChange={(selected) => {
          // Shim to match your old event-based onChange handler
          onChange({ target: { value: selected?.value || "", id } });
        }}
      />
    </div>
  );
};

export default FilterSelect;
