import CollegeCard from "./CollegeCard";
import FilterStatus from "./FilterStatus";

// CollegeGrid
const CollegeGrid = ({
  filteredData, loadingAll, loadingState, searchReady,
  showResults, resetMsg, isSearchMode,
  selectedState, selectedDistrict, selectedInstitution,
  selectedUniversity, selectedProgramme, searchValue,
  onViewCourses,
}) => {
  return (
    <div className="w-full flex justify-center px-5 pb-10">
      <div className="max-w-5xl w-full">

        {/* results */}
        {showResults && !loadingState && filteredData.length > 0 && (
          <>
            <FilterStatus
              filteredCount={filteredData.length}
              selectedState={selectedState}
              selectedDistrict={selectedDistrict}
              selectedInstitution={selectedInstitution}
              selectedUniversity={selectedUniversity}
              selectedProgramme={selectedProgramme}
              searchValue={searchValue}
              isSearchMode={isSearchMode}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {filteredData.map((college, i) => (
                <CollegeCard
                  key={`${college.institute_name}-${i}`}
                  college={college}
                  onViewCourses={onViewCourses}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
