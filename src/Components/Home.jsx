export default function Home(){




return(
<>
 <section className = "w-full pt-10 flex flex-col items-center   min-h-[79vh] bg-[#07111d] p-5">

    <div className = "flex justify-center items-center py-3 w-full max-w-7xl ">
      <div
        className = "max-w-6xl w-full bg-[background: rgba(255, 255, 255, 0.22);]     bg-white/10 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20  p-5 ">
        <div className="flex flex-wrap  gap-4">
          <input id="search"
            className=" py-2 px-3 w-full md:w-[30%] lg:w-[21%] text-[#E2E8F0]  cursor-wait duration-500 transition-all ease-in-out placeholder:text-[#E2E8F0] ring-1 ring-sky-500  outline-none border-[#2E3A47] border rounded-lg"
            type="search" placeholder="Enter the college name" readOnly
            title="Please wait,we are fetching all indian collages data... " />

          <select id="state" defaultValue=""
            className="w-full py-2 pl-4 border text-[#E2E8F0] border-[#2E3A47] rounded-lg outline-none ring-1 ring-sky-500 transition">
            <option className="text-[#E2E8F0] border-[#2E3A47] bg-[#202934] " disabled selected>State</option>
          </select>

          <select id="district"
            className="w-full py-2 text-[#E2E8F0] px-4 border   border-[#2E3A47] rounded-lg outline-none ring-1 ring-sky-500 transition">
            <option className="text-[#E2E8F0] border-[#2E3A47] bg-[#202934]" disabled selected>All District</option>
          </select>

          <select id="institution"
            className="w-full text-[#E2E8F0] py-2 px-4 border border-[#2E3A47] rounded-lg outline-none ring-1 ring-sky-500 transition">
            <option className="text-[#E2E8F0] border-[#2E3A47] bg-[#202934]" value="Institution" disabled selected>All
              Institution</option>

          

          </select>

          <select id="University"
            className="w-full py-2 text-[#E2E8F0] px-4 border border-[#2E3A47] rounded-lg outline-none ring-1 ring-blue-500 transition">
            <option className="text-[#E2E8F0] border-[#2E3A47] bg-[#202934] " disabled selected>All University</option>
          </select>

          <select id="programme"
            className="w-full py-2 px-4 border text-[#E2E8F0] border-[#2E3A47] rounded-lg outline-none ring-1 ring-blue-500 transition">
            <option disabled selected className="text-[#E2E8F0] border-[#2E3A47] bg-[#202934] ">All Programme</option>

          </select>
         {/* clear function */}
              <button id="reset-btn" className="p-3 rounded-lg ring-1 ring-blue-500  cursor-pointer hover:bg-blue-500/10  hover:scale-105 active:scale-95     transition-all duration-200 ease-in-out ">
               <svg  id="clear"  className=" text-[#E2E8F0] scale-100 transition-transform duration-300  "  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"/></svg>
              </button>

        </div>
      </div>
      {/* parent end div */}
    </div>


  {/* filter div */}
    <div className="px-5 max-w-6xl w-full justify-between text-blue-200 hidden" id="filter-div">

    {/* fliter status */}
      <div className="my-6 max-sm:text-sm max-sm:flex-row  " id="filter-status">
        {/* content */}
      </div>

      {/* college count */}
      <div className="flex items-center space-x-1"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
          viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M11.77 19q-.33 0-.55-.22t-.22-.55v-5.576L5.604 5.83q-.202-.27-.055-.55t.47-.28h11.962q.323 0 .47.28q.147.282-.055.55L13 12.655v5.577q0 .328-.22.549t-.55.22z" />
        </svg><span> Colleges:</span><span id="card-count">100</span>
      </div>
    </div>

    <div id="con" className ="transition-all ease-in-out hover:-translate-y-1 duration-300 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-6xl w-full py-8">
    {/* college list */}

    {/* loading alert  */}
      <div className="col-span-full justify-items-center mt-5 md:mt-20" id="loading-alert">
        <div role="status" className="justify-items-center">
          <svg aria-hidden="true" className="w-8 h-8 text-blue-100 animate-spin fill-blue-600" viewBox="0 0 100 101"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <p className="text-blue-200 pt-2">All Indian collages data are Loading...</p>
        </div>
      </div>
    </div>

   {/* search green flag */}
    <div className="col-span-full justify-items-center mt-5 md:mt-20 hidden" id="search-alert">
      <div role="status" className="justify-items-center">
        <p className="text-blue-200 pt-2">Now you can search collages 🔍...</p>
      </div>
    </div>
    
    

    {/* course dialog */}
    <dialog id="course-info"
      className="m-auto bg-blue-50 p-3 md:p-10 relative min-h-50 w-[90vw] md:w-3xl lg:w-4xl xl:w-5xl rounded-2xl ">
      <button type="button" className="absolute top-3 right-4 p-1 outline-none!" id="course-dialog-close-btn">
        <svg className="text-gray-800 hover:text-gray-800/60 cursor-pointer  active:scale-95" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </button>
      <div className ="relative overflow-x-auto shadow border rounded-lg mt-5">
        <table className ="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body border-b border-default">
            <tr className="bg-gray-300 *:px-6 *:py-3 *:font-medium text-center">
              <th scope="col">
                Course
              </th>
              <th scope="col">
                Level
              </th>
              <th scope="col">
                Filed
              </th>
              <th scope="col">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="*:**:even:bg-blue-100 *:border-b **:px-6 **:py-4 *:*:first:font-semibold whitespace-nowrap"
            id="course-table">
           {/* content */}
          </tbody>
        </table>
      </div>
    </dialog>
  </section>
  
 

</>


);}

