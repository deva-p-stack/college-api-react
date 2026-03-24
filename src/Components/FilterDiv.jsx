import { useContext, useMemo } from "react";
import { SelectionContext } from "./Context/SelectionContext";
import  FilterSelect  from "./FilterSelect";

const FilterDiv = ({ allStatesArr, allColleges, loading }) => {
  const { selections, setSelections } = useContext(SelectionContext);
  const allCollagesArr = useMemo(() => allColleges ?? [], [allColleges]);

  const options = useMemo(() => {
    if (!selections.state || allCollagesArr.length === 0) {
      return {
        districts: [],
        universities: [],
        institutions: [],
        degrees: [],
        programmes: [],
      };
    }

    const byState = allCollagesArr.filter((c) => c.state === selections.state);

    const byDistrict =
      selections.district !== "All"
        ? byState.filter((c) => c.district === selections.district)
        : byState;

    const byInstitution =
      selections.institution !== "All"
        ? byDistrict.filter(
            (c) => c.institution_type === selections.institution,
          )
        : byDistrict;

    const byUniversity =
      selections.university !== "All"
        ? byInstitution.filter((c) => c.university === selections.university)
        : byInstitution;

    // This is where the "PLANNING" filtering happens
    const byDegree =
      selections.degree !== "All"
        ? byUniversity.filter((c) =>
            c.programmes?.some((p) => p.programme === selections.degree),
          )
        : byUniversity;

    return {
      districts: [...new Set(byState.map((c) => c.district))]
        .filter(Boolean)
        .sort(),
      institutions: [...new Set(byDistrict.map((c) => c.institution_type))]
        .filter(Boolean)
        .sort(),
      universities: [...new Set(byInstitution.map((c) => c.university))]
        .filter((u) => u && u !== "NONE")
        .sort(),
      degrees: [
        ...new Set(
          byUniversity
            .flatMap((c) => c.programmes ?? [])
            .map((p) => p.programme),
        ),
      ]
        .filter(Boolean)
        .sort(),
      // Programs are now strictly narrowed down by the selected Degree
      programmes: [
        ...new Set(
          byDegree
            .flatMap((c) => c.programmes ?? [])
            .filter(
              (p) =>
                selections.degree === "All" ||
                p.programme === selections.degree,
            )
            .map((p) => p.course),
        ),
      ]
        .filter(Boolean)
        .sort(),
    };
  }, [selections, allCollagesArr]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const resetMap = {
      state: {
        district: "All",
        institution: "All",
        university: "All",
        degree: "All",
        programme: "All",
        // search: "",
      },
      district: {
        institution: "All",
        university: "All",
        degree: "All",
        programme: "All",
      },
      institution: { university: "All", degree: "All", programme: "All" },
      university: { degree: "All", programme: "All" },
      degree: { programme: "All" },
      programme: {},
    };

    setSelections((prev) => ({
      ...prev,
      [id]: value,
      ...(resetMap[id] || {}),
    }));
  };

  return (
    <>
      <FilterSelect
        id="state"
        value={selections.state}
        onChange={handleChange}
        options={allStatesArr.map((s) => s.name)}
        placeholder="Select State"
        loading={loading}
      />
      <FilterSelect
        id="district"
        value={selections.district}
        onChange={handleChange}
        disabled={!selections.state}
        options={options.districts}
        placeholder="All Districts"
      />
      <FilterSelect
        id="institution"
        value={selections.institution}
        onChange={handleChange}
        disabled={!selections.state}
        options={options.institutions}
        placeholder="Institution Type"
      />
      <FilterSelect
        id="university"
        value={selections.university}
        onChange={handleChange}
        disabled={!selections.state}
        options={options.universities}
        placeholder="All Universities"
      />
      <FilterSelect
        id="degree"
        value={selections.degree}
        onChange={handleChange}
        disabled={!selections.state}
        options={options.degrees}
        placeholder="All Degrees"
      />
      <FilterSelect
        id="programme"
        value={selections.programme}
        onChange={handleChange}
        disabled={!selections.state}
        options={options.programmes}
        placeholder="All Programmes"
      />
    </>
  );
};

export default FilterDiv;
