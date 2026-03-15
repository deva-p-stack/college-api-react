import { useContext, useEffect, useState } from "react";

import SelectOption from "./SelectOption";
import FilterDiv from "./FilterDiv";
import { SelectionContext } from "./Context/SelectionContext";
import CollegeGrid from "./CollegeGrid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_KEY = "https://indian-colleges-list.vercel.app/api";

const Home = () => {
  const [allStates, setAllStates] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  //
  const [stateArr, setStateArr] = useState([]);
  const [districtArr, setDistrictArr] = useState([]);
  const [instituteArr, setInstituteArr] = useState([]);
  const [universityArr, setUniversityArr] = useState([]);
  // const [programmeArr, setProgrammeArr] = useState([]);

  // Filter States
  const { selections, setSelections } = useContext(SelectionContext);

  // 1. Initial Load: Get States
  useEffect(() => {
    async function getAllStates() {
      try {
        const response = await fetch(`${BASE_API_KEY}/institutions/states`);
        const data = await response.json();
        setAllStates(data.states);
        fetchAllColleges(data.states);
      } catch (error) {
        console.error(error);
      }
    }
    getAllStates();
  }, []);

  // search
  const [searchTerm, setSearchTerm] = useState(selections.search);

  // handle onchange input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Debounce logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSelections((prev) => ({
        ...prev,
        state: "",
        district: "All",
        institution: "All",
        university: "All",
        programme: "All",
        search: searchTerm,
      }));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSelections]);

  // 2.all colleges get
  const fetchAllColleges = async (states) => {
    let completed = 0;
    const total = states.length;

    try {
      const promises = states.map(async (state) => {
        const response = await fetch(
          `${BASE_API_KEY}/institutions/states/${state.name}`,
        );
        const data = await response.json();
        completed++;
        setProgress(Math.round((completed / total) * 100));
        return data;
      });

      const results = await Promise.all(promises);
      const flatData = results.flatMap((item) => item.data || []);
      const sortedData = [...flatData].sort((a, b) => {
        const nameA = a.institute_name.trim();
        const nameB = b.institute_name.trim();
        return nameA.localeCompare(nameB, undefined, {
          sensitivity: "accent",
        });
      });

      setAllColleges(sortedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 3.filter logic
  useEffect(() => {
    // selection values
    const hasState = selections.state !== "";
    const hasDistrict = selections.district !== "All";
    const hasInstitution = selections.institution !== "All";
    const hasUniversity = selections.university !== "All";
    const hasProgramme = selections.programme !== "All";
    const hasSearch = selections.search.trim() !== "";

    switch (true) {
      // 1- Programme
      case hasProgramme: {
        const source = hasUniversity
          ? universityArr
          : hasInstitution
            ? instituteArr
            : hasDistrict
              ? districtArr
              : stateArr;

        // const filtered = source.filter(
        //   (c) => c.programme === selections.programme,
        // );

        const filteredProgrammeArr = source.filter((collage) => {
          if (selections.programme === "All") {
            return collage;
          }

          const hasMatch = collage.programmes.some((programme) => {
            // console.log("programme: ", programme.programme);

            const isMatch = programme.course === selections.programme;
            // console.log(isMatch);

            return isMatch;
          });

          // console.log("This collage had the course? ", hasMatch);
          // console.log("---------------------------");

          return hasMatch;
        });

        // setProgrammeArr(filteredProgrammeArr);
        setFilteredColleges(filteredProgrammeArr);
        break;
      }

      // 2- University
      case hasUniversity: {
        const source = hasInstitution
          ? instituteArr
          : hasDistrict
            ? districtArr
            : stateArr;

        const filtered = source.filter((college) => {
          if (selections.university === "All") {
            return college;
          }
          return college.university === selections.university;
        });
        setUniversityArr(filtered);
        setFilteredColleges(filtered);
        break;
      }

      // 3- Institution
      case hasInstitution: {
        const source = hasDistrict ? districtArr : stateArr;

        const filtered = source.filter((college) => {
          if (selections.institution === "All") {
            return college;
          }
          return college.institution_type === selections.institution;
        });
        setInstituteArr(filtered);
        setFilteredColleges(filtered);
        break;
      }

      // 4- District
      case hasDistrict: {
        const filtered = stateArr.filter((college) => {
          if (selections.district === "All") {
            return college;
          }
          return college.district === selections.district;
        });
        setDistrictArr(filtered);
        setFilteredColleges(filtered);
        break;
      }

      // 5- State (The only one that touches the 13,000+ records)
      case hasState: {
        const filtered = allColleges.filter(
          (collage) => collage.state === selections.state,
        );
        setStateArr(filtered);
        setFilteredColleges(filtered);
        break;
      }

      // 6- name
      case hasSearch: {
        console.log(selections.search);

        const filtered = allColleges.filter((college) => {
          // college.institute_name?.toLowerCase().includes(selections.name);
          const ClgName = college.institute_name.toLowerCase().trim();
          const inputName = selections.search.toLowerCase().trim();
          return ClgName.includes(inputName);
        });
        setFilteredColleges([...filtered]);
        // console.log(filteredColleges);

        break;
      }

      // Reset to show everything
      default:
        setFilteredColleges([]);
        break;
    }

    console.log(selections);
  }, [selections, allColleges]);

  // notify
  const notify = (text) => {
    toast.success(text);
  };

  // reset function
  function resetData() {
    if (
      selections.state !== "" ||
      selections.district !== "All" ||
      selections.institution !== "All" ||
      selections.university !== "All" ||
      selections.programme !== "All"
    ) {
      setSelections((prev) => ({
        ...prev,
        state: "",
        district: "All",
        institution: "All",
        university: "All",
        programme: "All",
        search: "",
      }));

      notify("Filtered data has been reset");
    } else {
      notify("Already reset!");
    }
  }

  return (
    <>
      <div className="">
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <section className="w-full pt-10 flex flex-col items-center min-h-[79vh] bg-[#07111d] p-5">
        <div className="flex flex-wrap gap-4 max-w-6xl w-full bg-[background: rgba(255, 255, 255, 0.22);] bg-white/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20  p-5 ">
          <input
            id="search"
            className= {`py-2 px-3 w-full md:w-[30%] lg:w-[21%] text-[#E2E8F0] duration-500 transition-all ease-in-out placeholder:text-[#E2E8F0] ring-1 ring-sky-500  outline-none border-[#2E3A47] border rounded-lg ${loading ? "cursor-wait" : "cursor-text"}`}
            type="search"
            placeholder="Enter the college name"
            title={`${loading ? "Please wait,we are fetching all indian colleges data... " : "Now you can search 🔍 colleges by name..."}`}
            readOnly = {loading && true}
            onChange={handleSearchChange}
          />

          {/* select filters */}
          <FilterDiv
            allStatesArr={allStates}
            allColleges={allColleges}
            loading={loading}
          />

          {/* clear function */}
          <button
            id="reset-btn"
            onClick={resetData}
            className="p-3 rounded-lg ring-1 ring-blue-500  cursor-pointer hover:bg-blue-500/10  hover:scale-105 active:scale-95     transition-all duration-200 ease-in-out ">
            <svg
              id="clear"
              className=" text-[#E2E8F0] scale-100 transition-transform duration-300  "
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"
              />
            </svg>
          </button>
        </div>

        <CollegeGrid
          loading={loading}
          progress={progress}
          selections={selections}
          filteredColleges={filteredColleges}
        />

        {/* course dialog */}
        <dialog
          id="course-info"
          className="m-auto bg-blue-50 p-3 md:p-10 relative min-h-50 w-[90vw] md:w-3xl lg:w-4xl xl:w-5xl rounded-2xl ">
          <button
            type="button"
            className="absolute top-3 right-4 p-1 outline-none!"
            id="course-dialog-close-btn">
            <svg
              className="text-gray-800 hover:text-gray-800/60 cursor-pointer  active:scale-95"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </button>
          <div className="relative overflow-x-auto shadow border rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body border-b border-default">
                <tr className="bg-gray-300 *:px-6 *:py-3 *:font-medium text-center">
                  <th scope="col">Course</th>
                  <th scope="col">Level</th>
                  <th scope="col">Filed</th>
                  <th scope="col">Availability</th>
                </tr>
              </thead>
              <tbody
                className="*:**:even:bg-blue-100 *:border-b **:px-6 **:py-4 *:*:first:font-semibold whitespace-nowrap"
                id="course-table">
                {/* content */}
              </tbody>
            </table>
          </div>
        </dialog>
      </section>
    </>
  );
};;;

export default Home;
