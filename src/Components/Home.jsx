import { useContext, useEffect, useState, useMemo } from "react";
import FilterDiv from "./FilterDiv";
import { SelectionContext } from "./Context/SelectionContext";
import CollegeGrid from "./CollegeGrid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseDialog from "./CourseDialog";

const BASE_API_KEY = "https://indian-colleges-list.vercel.app/api";

const Home = () => {
  const [allStates, setAllStates] = useState([]);
  const [allColleges, setAllColleges] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { selections, setSelections } = useContext(SelectionContext);
  const [searchTerm, setSearchTerm] = useState(selections.search);

  /**
   * 1. fetchAllColleges - Declared as a standard function so it is hoisted.
   * Processes data in chunks of 4 to prevent "Address Unreachable" errors.
   */
  async function fetchAllColleges(states, signal) {
    let accumulatedData = [];
    const total = states.length;
    const chunkSize = 4;

    try {
      for (let i = 0; i < total; i += chunkSize) {
        const chunk = states.slice(i, i + chunkSize);

        const results = await Promise.all(
          chunk.map(async (state) => {
            const res = await fetch(
              `${BASE_API_KEY}/institutions/states/${encodeURIComponent(state.name)}`,
              { signal },
            );
            if (!res.ok) throw new Error("Batch fetch failed");
            return res.json();
          }),
        );

        results.forEach((res) => accumulatedData.push(...(res.data || [])));
        setProgress(Math.round(((i + chunk.length) / total) * 100));
      }

      // Sort alphabetically by name
      const sortedData = accumulatedData.sort((a, b) =>
        a.institute_name.trim().localeCompare(b.institute_name.trim()),
      );

      setAllColleges(sortedData);
      setLoading(false);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch Error:", error);
        toast.error("Database connection interrupted.");
        setLoading(false);
      }
    }
  }

  /**
   * 2. Initial Data Load
   */
  useEffect(() => {
    const controller = new AbortController();

    async function init() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_KEY}/institutions/states`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Failed to fetch states list");

        const data = await response.json();
        setAllStates(data.states);

        // Pass the controller signal to the batch fetcher
        fetchAllColleges(data.states, controller.signal);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Initialization error:", error);
          toast.error("API is currently unreachable.");
          setLoading(false);
        }
      }
    }

    init();
    return () => controller.abort(); // Cleanup network requests on unmount
  }, []);

  /**
   * 3. Search Debounce logic
   */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSelections((prev) => ({ ...prev, search: searchTerm }));
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSelections]);

  /**
   * 4. High-Performance Filter Logic
   * Derives filtered list from allColleges state
   */
  const filteredColleges = useMemo(() => {
    if (allColleges.length === 0) return [];

    return allColleges.filter((college) => {
      // search
      const matchSearch =
        !selections.search ||
        college.institute_name
          .toLowerCase()
          .includes(selections.search.toLowerCase().trim());

      // state
      const matchState =
        !selections.state || college.state === selections.state;

      // district
      const matchDistrict =
        selections.district === "All" ||
        college.district === selections.district;

      // institute
      const matchInstType =
        selections.institution === "All" ||
        college.institution_type === selections.institution;
      // university
      const matchUniversity =
        selections.university === "All" ||
        college.university === selections.university;
      // degree
      const matchDegree =
        selections.degree === "All" ||
        college.programmes?.some((p) => p.programme === selections.degree);
      // programme
      const matchProgramme =
        selections.programme === "All" ||
        college.programmes?.some((p) => p.course === selections.programme);

      return (
        matchSearch &&
        matchState &&
        matchDistrict &&
        matchInstType &&
        matchUniversity &&
        matchDegree &&
        matchProgramme
      );
    });
  }, [allColleges, selections]);

  // console.log(filteredColleges);
  // console.log(filteredColleges < 1);
  
  /**
   * 5. Reset Handler
   */
  function resetData() {
    setSelections({
      state: "",
      district: "All",
      institution: "All",
      university: "All",
      degree: "All",
      programme: "All",
      search: "",
    });
    setSearchTerm("");
    toast.info("All filters cleared.");
  }

  return (
    <>
      <ToastContainer theme="dark" position="top-right" autoClose={2000} />

      <section className="w-full pt-10 flex flex-col items-center min-h-[85vh] bg-[#07111d] p-5">
        {/* Unified Search and Filter Bar */}
        <div className="flex flex-wrap gap-4 max-w-7xl w-full bg-white/5 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-6">
          <input
            id="search"
            className="py-2.5 px-4 w-full md:w-[250px] text-white bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 transition-all disabled:cursor-wait placeholder:text-slate-500 text-sm"
            type="search"
            placeholder="Search college name..."
            value={searchTerm}
            disabled={loading}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterDiv
            allStatesArr={allStates}
            allColleges={allColleges}
            loading={loading}
          />

          <button
            onClick={resetData}
            disabled={filteredColleges.length < 1 || (selections.state === "" && selections.search === "")}
            className="p-3 rounded-xl bg-white/5 text-slate-300 hover:bg-sky-500 hover:text-white transition-all active:scale-90 border border-white/10 cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            title="Reset Filters">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
        </div>

        {/* Empty State */}
        {!loading && filteredColleges.length === 0 && (
          <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="text-5xl mb-4">🏫</div>
            <h3 className="text-xl font-bold text-white">
              No Institutions Match
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Try refining your filters or search keywords.
            </p>
            <button
              onClick={resetData}
              className="mt-6 px-6 py-2 bg-sky-600/20 text-sky-400 rounded-full text-xs font-bold hover:bg-sky-600 hover:text-white transition-all">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Data Grid */}
        <CollegeGrid
          loading={loading}
          progress={progress}
          selections={selections}
          filteredColleges={filteredColleges}
        />
      </section>

      <CourseDialog />
    </>
  );
};

export default Home;
