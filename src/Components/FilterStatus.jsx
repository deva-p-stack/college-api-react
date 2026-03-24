import { useContext } from "react";
import { exportToExcel } from "./utils/exportToExcel";
import { SelectionContext } from "./Context/SelectionContext";
import { Download, Info, Search, Filter } from "lucide-react";

const Badge = ({ label, value }) => (
  <span className="flex items-center bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md text-[11px] font-medium text-sky-400">
    <span className="opacity-60 mr-1 mt-0.5 uppercase text-[9px] font-black">
      {label}:
    </span>
    <span className="">{value}</span>
  </span>
);

const FilterStatus = ({ filteredColleges }) => {
  const { selections } = useContext(SelectionContext);

  const handleExport = () => {
    if (filteredColleges.length === 0) return;
    exportToExcel(filteredColleges, "Colleges_Filtered_List");
  };

  // Determine if any filters (including search) are active
  const hasActiveFilters =
    selections.search !== "" ||
    selections.state !== "" ||
    selections.district !== "All" ||
    selections.institution !== "All" ||
    selections.university !== "All" ||
    selections.degree !== "All" ||
    selections.programme !== "All";

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 px-2 my-6 animate-in fade-in duration-500">
      {/* Left: Filter Badges */}
      <div className="flex items-center flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-slate-400 mr-2">
          <Filter size={14} className="text-sky-500" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Active Filters:
          </span>
        </div>

        {!hasActiveFilters ? (
          <span className="text-xs italic text-slate-500">
            Showing all records
          </span>
        ) : (
          <>
            {/* Search Badge */}
            {selections.search && (
              <Badge label="Search" value={selections.search} />
            )}

            {/* Dropdown Badges */}
            {selections.state && (
              <Badge label="State" value={selections.state} />
            )}

            {selections.district !== "All" && selections.district !== "" && (
              <Badge label="District" value={selections.district} />
            )}

            {selections.institution !== "All" &&
              selections.institution !== "" && (
                <Badge label="Type" value={selections.institution} />
              )}

            {selections.university !== "All" &&
              selections.university !== "" && (
                <Badge label="University" value={selections.university} />
              )}

            {selections.degree !== "All" && selections.degree !== "" && (
              <Badge label="Degree" value={selections.degree} />
            )}

            {selections.programme !== "All" && selections.programme !== "" && (
              <Badge label="Course" value={selections.programme} />
            )}
          </>
        )}
      </div>

      {/* Right: Results Count & Export */}
      <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-black text-white">
            {filteredColleges.length}
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
            {filteredColleges.length > 1 ? "Colleges" : "Collage"} Found
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        <button
          onClick={handleExport}
          title="Export to Excel"
          className="group flex items-center gap-2 text-sky-400 hover:text-white transition-colors cursor-pointer">
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
            Export
          </span>
          <Download
            size={18}
            className="group-hover:translate-y-0.5 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default FilterStatus;
