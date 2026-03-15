import { useContext } from "react";
import { SelectionContext } from "./Context/SelectionContext";

const FilterStatus = ({ filteredCollegesCount }) => {
  const { selections } = useContext(SelectionContext);

  return (
    <div className="flex justify-between items-start flex-wrap gap-2 px-1 my-4 text-blue-200 text-sm">
      <p className="m-0 flex space-x-1">
        <strong>Filtered by: </strong>
        {/* search */}
        {selections.search == "" ? (
          <>
            {/* state */}
            {selections.state !== "" && (
              <>
                <span className="*:font-light">
                  state : <span>{selections.state}</span>
                </span>
              </>
            )}
            {/* district */}
            {selections.district !== "" && selections.district !== "All" && (
              <>
                <span className="*:font-light">
                  , district : <span>{selections.district}</span>
                </span>
              </>
            )}
            {/* institution */}
            {selections.institution !== "" &&
              selections.institution !== "All" && (
                <>
                  <span className="*:font-light">
                    , institution : <span>{selections.institution}</span>
                  </span>
                </>
              )}
            {/* university */}
            {selections.university !== "" &&
              selections.university !== "All" && (
                <>
                  <span className="*:font-light">
                    , university : <span>{selections.university}</span>
                  </span>
                </>
              )}
            {/* programme */}
            {selections.programme !== "" && selections.programme !== "All" && (
              <>
                <span className="*:font-light">
                  , programme : <span>{selections.programme}</span>
                </span>
              </>
            )}
          </>
        ) : (
          <>
            {/* name */}
            <span className="*:font-light">
              name : <span>{selections.search}</span>
            </span>
          </>
        )}
      </p>
      <p className="flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11.77 19q-.33 0-.55-.22t-.22-.55v-5.576L5.604 5.83q-.202-.27-.055-.55t.47-.28h11.962q.323 0 .47.28q.147.282-.055.55L13 12.655v5.577q0 .328-.22.549t-.55.22zm.23-6.7L16.95 6h-9.9zm0 0"
          />
        </svg>
        <span>:</span> <span>{filteredCollegesCount}</span>
      </p>
    </div>
  );
};

export default FilterStatus;