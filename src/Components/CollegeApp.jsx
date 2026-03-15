import { useState } from "react";
import { useCollegeData } from "../hooks/useCollegeData";
import Header from "./Header";
import FilterBar from "./FilterBar";
import CollegeGrid from "./CollegeGrid";
import CourseDialog from "./CourseDialog";
import Footer from "./Footer";

// CollegeApp — root component
// Calls useCollegeData, holds dialog state, passes data to children
export default function CollegeApp() {
  const {
    states, filteredData,
    districts, institutions, universities, programmes,
    selectedState, selectedDistrict, selectedInstitution,
    selectedUniversity, selectedProgramme, searchValue,
    setSelectedState, setSelectedDistrict, setSelectedInstitution,
    setSelectedUniversity, setSelectedProgramme, setSearchValue,
    loadingAll, loadingState, searchReady,
    showResults, resetMsg, isSearchMode,
    handleReset,
  } = useCollegeData();

  // Dialog is local state — only CollegeApp + CourseDialog need it
  const [activeCourse, setActiveCourse] = useState(null);

  return (
    <div className="min-h-screen bg-[#07111d] flex flex-col text-slate-200">

      <Header />

      <main className="flex-1 flex flex-col items-center pt-2 pb-8">

        <FilterBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchReady={searchReady}
          loadingAll={loadingAll}
          states={states}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          districts={districts}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          institutions={institutions}
          selectedInstitution={selectedInstitution}
          setSelectedInstitution={setSelectedInstitution}
          universities={universities}
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          programmes={programmes}
          selectedProgramme={selectedProgramme}
          setSelectedProgramme={setSelectedProgramme}
          handleReset={handleReset}
        />

        <CollegeGrid
          filteredData={filteredData}
          loadingAll={loadingAll}
          loadingState={loadingState}
          searchReady={searchReady}
          showResults={showResults}
          resetMsg={resetMsg}
          isSearchMode={isSearchMode}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          selectedInstitution={selectedInstitution}
          selectedUniversity={selectedUniversity}
          selectedProgramme={selectedProgramme}
          searchValue={searchValue}
          onViewCourses={setActiveCourse}
        />

      </main>

      <Footer />

      <CourseDialog
        college={activeCourse}
        onClose={() => setActiveCourse(null)}
      />

    </div>
  );
}
