import CollegeCard from "./CollegeCard";
import FilterStatus from "./FilterStatus";
import nowsearch from '../assets/1.jpg';

// Loading
function Loading({ progress }) {
  return (
    <div>
      <p className="text-sky-400 mb-4 animate-pulse">
        Getting data from College Databases... {progress}%
      </p>

      {/* Outer Track */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
        {/* Inner Fill */}
        <div
          className="h-full bg-linear-to-r from-blue-600 to-sky-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function OuterLayout({ children }) {
  return (
    <div className="col-span-full min-h-[56.5vh] flex flex-col items-center justify-center py-20 gap-3">
      {children}
    </div>
  );
}

const CollegeGrid = ({ loading, progress, selections, filteredColleges }) => {
  // useEffect(() => {
  //   console.log("hii");
  // },[filteredColleges])
  return (
    <div className="w-full flex justify-center px-5 pb-10">
      <div className="max-w-5xl w-full">
        {/* ── 1. Initial loading ────────────────────── */}
        {loading ? (
          <OuterLayout>
            <Loading progress={progress} />
          </OuterLayout>
        ) : selections.state === "" && selections.search === "" ? (
          <OuterLayout>
            <img
              src={nowsearch}
              className="w-100 h-auto brightness-70 saturate-50"
              alt=""
            />
            <p className="text-blue-200 font-light">
              Now you can filter & search Colleges...
            </p>
          </OuterLayout>
        ) : filteredColleges.length > 0 ? (
          <>
            <FilterStatus filteredColleges={filteredColleges} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
               
              {filteredColleges.map((college, id) => (
                <CollegeCard key={id} college={college} />
              ))}
            </div>
          </>
        ) : (
          <OuterLayout>
            <p className="text-white">No College data found...</p>
          </OuterLayout>
        )}
      </div>
    </div>
  );
};

export default CollegeGrid;
