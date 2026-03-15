import { useState } from "react";
import { SelectionContext } from "./SelectionContext";

const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState({
    state: "",
    district: "All",
    institution: "All",
    university: "All",
    programme: "All",
    search: "",
  });

  return (
    <SelectionContext.Provider
      value={{
        selections,
        setSelections,
      }}>
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;