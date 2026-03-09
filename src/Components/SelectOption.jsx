const SelectOption = ({ id, defaultOption, setOption, allOptions}) => {
  {console.log(allOptions);
  }
  return (
    <select
      id={id}
      // onChange={(e) => setOption(e.target.value)}
      className="w-full py-2 pl-4 border text-[#E2E8F0] border-[#2E3A47] rounded-lg outline-none ring-1 ring-sky-500 transition *:text-[#E2E8F0] *:border-[#2E3A47] *:bg-[#202934] ">
      <option className="" value={defaultOption === "state" ? "" : `All`}>
          {id !== "state" && "All"} {id}
        </option>
      {allOptions && allOptions.map((state, index) => {
        return (
            <option key={index} value={state.name}>
              {state.name}
            </option>
        );
      })}
    </select>
  );
};

export default SelectOption;