import { useContext, useMemo } from "react";
import { SelectionContext } from "./Context/SelectionContext";

const FilterDiv = ({
  states,
  disabled,
  allCollages = [],
}) => {

  const {selections , setSelections} = useContext(SelectionContext)

  const options = useMemo(() => {
    const stateData = selections.state
      ? allCollages.filter((collage) => collage.state === selections.state)
      : [];
    return {
      districts: [...new Set(stateData.map((c) => c.district))].sort(),
      universities: [...new Set(stateData.map((c) => c.university))]
        .filter((u) => u && u !== "NONE")
        .sort(),
      institutions: [...new Set(allCollages.map((c) => c.institution_type))]
        .filter(Boolean)
        .sort(),
      programmes: [
        ...new Set(
          stateData.flatMap((c) => c.programmes || []).map((p) => p.name),
        ),
      ].sort(),
    };
  }, [selections.state, allCollages]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "state") {
      setSelections((prev) => ({
        ...prev,
        state: value,
        district: "All",
        university: "All",
        programme: "All",
      }));
    }
  };

  return (
    <>
      <select
        id="state"
        value={selections.state}
        onChange={handleChange}
        disabled={disabled}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.name} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        id="district"
        value={selections.district}
        onChange={handleChange}
        disabled={!selections.state}>
        <option value="All">All Districts</option>
        {options.districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        id="institution"
        value={selections.institution}
        onChange={handleChange}>
        <option value="All">Institution Type</option>
        {options.institutions.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <select
        id="university"
        value={selections.university}
        onChange={handleChange}
        disabled={!selections.state}>
        <option value="All">All Universities</option>
        {options.universities.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <select
        id="programme"
        value={selections.programme}
        onChange={handleChange}
        disabled={!selections.state}>
        <option value="All">All Programmes</option>
        {options.programmes.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterDiv;