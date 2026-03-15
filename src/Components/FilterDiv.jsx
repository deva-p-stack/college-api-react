import { useContext, useMemo } from "react";
import { SelectionContext } from "./Context/SelectionContext";

const FilterDiv = ({
  allStatesArr,
  allColleges,
  loading
}) => {

  const {selections , setSelections} = useContext(SelectionContext)

  const allCollagesArr = useMemo(() => allColleges ?? [], [allColleges]);

  const options = useMemo(() => {
    // Guard: wait until data is ready
    if (!selections.state || allCollagesArr.length === 0) {
      return {
        districts: [],
        universities: [],
        institutions: [],
        programmes: [],
      };
    }

    // 1. Level 1: Filter by State (Base for everything)
    const collegesInState = allCollagesArr.filter(
      (c) => c.state === selections.state,
    );

    // 2. Level 2: Filter by District (Base for University/Institution/Programme)
    const collegesInDistrict =
      selections.district !== "All"
        ? collegesInState.filter((c) => c.district === selections.district)
        : collegesInState;

    // 3. Level 3: Filter by Institution Type (Base for University/Programme)
    const collegesInInstitution =
      selections.institution !== "All"
        ? collegesInDistrict.filter(
            (c) => c.institution_type === selections.institution,
          )
        : collegesInDistrict;

    // 4. Level 4: Filter by University (Base for Programme)
    const collegesInUniversity =
      selections.university !== "All"
        ? collegesInInstitution.filter(
            (c) => c.university === selections.university,
          )
        : collegesInInstitution;

    return {
      // Districts always show everything in the selected State
      districts: [...new Set(collegesInState.map((c) => c.district))]
        .filter(Boolean)
        .sort(),

      // Universities narrow down based on District and Institution
      universities: [...new Set(collegesInInstitution.map((c) => c.university))]
        .filter((u) => u && u !== "NONE")
        .sort(),

      // Institutions narrow down based on District
      institutions: [
        ...new Set(collegesInDistrict.map((c) => c.institution_type)),
      ]
        .filter(Boolean)
        .sort(),

      // Programmes narrow down based on State > District > Institution > University
      programmes: [
        ...new Set(
          collegesInUniversity
            .flatMap((c) => c.programmes ?? [])
            .map((p) => p.course),
        ),
      ]
        .filter(Boolean)
        .sort(),
    };
  }, [selections, allCollagesArr]);

  // console.log(options, selections);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "state":
        setSelections((prev) => ({
          ...prev,
          state: value,
          district: "All",
          institution: "All",
          university: "All",
          programme: "All",
          search:"" 
        }));
        break;

      case "district":
        setSelections((prev) => ({
          ...prev,
          district: value,
          institution: "All",
          university: "All",
          programme: "All",
          search: ""
        }));
        break;

      case "institution":
        setSelections((prev) => ({
          ...prev,
          institution: value,
          university: "All",
          programme: "All",
          search: ""
        }));
        break;

      case "university":
        setSelections((prev) => ({
          ...prev,
          university: value,
          programme: "All",
          search: ""
        }));
        break;

      case "programme":
        setSelections((prev) => ({
          ...prev,
          programme: value,
          search: ""
        }));
        break;

      default:
        setSelections((prev) => ({
          ...prev,
          state: "",
          district: "All",
          institution: "All",
          university: "All",
          programme: "All",
          search: "",
        }));
        break;
    }
    // if (id === "state") {
    //   setSelections((prev) => ({
    //     ...prev,
    //     state: value,
    //     district: "All",
    //     university: "All",
    //     programme: "All",
    //   }));
    // }
  };

  return (
    <>
      <select
        id="state"
        value={selections.state}
        onChange={handleChange}
        disabled={loading && true}
        className={`${loading ? "cursor-progress" : "cursor-pointer"}`}>
        <option value="">Select State</option>
        {allStatesArr.map((s) => (
          <option key={s.name} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        id="district"
        value={selections.district}
        onChange={handleChange}
        disabled={!selections.state}
        title={selections.state === "" ? "select any state" : ""}
        className={`${loading ? "cursor-progress" : selections.state === "" ? "cursor-not-allowed" : "cursor-pointer"}`}>
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
        onChange={handleChange}
        disabled={!selections.state}
        title={selections.state === "" ? "select any state" : ""}
        className={`${loading ? "cursor-progress" : selections.state === "" ? "cursor-not-allowed" : "cursor-pointer"}`}>
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
        disabled={!selections.state}
        title={selections.state === "" ? "select any state" : ""}
        className={`${loading ? "cursor-progress" : selections.state === "" ? "cursor-not-allowed" : "cursor-pointer"}`}>
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
        disabled={!selections.state}
        title={selections.state === "" ? "select any state" : ""}
        className={`${loading ? "cursor-progress" : selections.state === "" ? "cursor-not-allowed" : "cursor-pointer"}`}>
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