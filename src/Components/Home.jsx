import { useContext, useEffect, useState } from "react";
import UseFetchApi from "../summa/CustomHook/UseFetchApi";
import SelectOption from "./SelectOption";
import FilterDiv from "./FilterDiv";
import CollegeCard from "./CollegeCard";
import { SelectionContext } from "./Context/SelectionContext";

const BASE_API_KEY = "https://indian-colleges-list.vercel.app/api";

const Home = ()=> {
  const [allStates, setAllStates] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter States
  const { selections} = useContext(SelectionContext)

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
    
      setAllColleges(flatData)
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // 3.filter logic
  useEffect(() => {
    let result = allColleges;

    if(selections.state){
      result = result.filter(college => college.state === selections.state);
    }

    console.log(result);
    

    setFilteredColleges(result);
  },[selections, allColleges])



  return (
    <>
      <section className="w-full pt-10 flex flex-col items-center min-h-[79vh] bg-[#07111d] p-5">
        <div className="flex flex-wrap gap-4 max-w-6xl w-full bg-[background: rgba(255, 255, 255, 0.22);] bg-white/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20  p-5 ">
          <input
            id="search"
            className=" py-2 px-3 w-full md:w-[30%] lg:w-[21%] text-[#E2E8F0]  cursor-wait duration-500 transition-all ease-in-out placeholder:text-[#E2E8F0] ring-1 ring-sky-500  outline-none border-[#2E3A47] border rounded-lg"
            type="search"
            placeholder="Enter the college name"
            readOnly
            title="Please wait,we are fetching all indian colleges data... "
          />

          {/* select filters */}
          <FilterDiv
            states={allStates}
            disabled={loading}
            allColleges={allColleges}
          />

          {/* clear function */}
          <button
            id="reset-btn"
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

        {loading ? (
          <div className="max-w-xl min-h-[52vh] mx-auto mt-20 text-center">
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
        ) : selections.state === "" ? (
          <div className=" min-h-[62vh] content-center">
            <p className="text-white">Now you can search 🔍...</p>
          </div>
        ) : (
          <div
            id="container"
            className="transition-all ease-in-out hover:-translate-y-1 duration-300 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-6xl w-full py-8">
            {/* college list */}
            {filteredColleges.map((college, id) => (
              <CollegeCard key={id} college={college} />
            ))}
          </div>
        )}

        {/* filter div */}
        <div
          className="px-5 max-w-6xl w-full justify-between text-blue-200 hidden"
          id="filter-div">
          {/* fliter status */}
          <div
            className="my-6 max-sm:text-sm max-sm:flex-row  "
            id="filter-status">
            {/* content */}
          </div>

          {/* college count */}
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11.77 19q-.33 0-.55-.22t-.22-.55v-5.576L5.604 5.83q-.202-.27-.055-.55t.47-.28h11.962q.323 0 .47.28q.147.282-.055.55L13 12.655v5.577q0 .328-.22.549t-.55.22z"
              />
            </svg>
            <span> Colleges:</span>
            <span id="card-count">100</span>
          </div>
        </div>

        {/* search green flag */}
        {/* <div
          className="col-span-full justify-items-center mt-5 md:mt-20 hidden"
          id="search-alert">
          <div role="status" className="justify-items-center">
            <p className="text-blue-200 pt-2">
              Now you can search colleges 🔍...
            </p>
          </div>
        </div> */}

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
}

export default Home;