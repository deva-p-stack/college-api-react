import { useContext, useState, useEffect } from "react";
import { CourseContext } from "./Context/CourseContext";

function CopyField({ icon, value, accent }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div
      onClick={handleCopy}
      className={`flex items-start ${accent ? "gap-3" : "gap-2"} pt-2 text-slate-100 cursor-pointer hover:opacity-80 transition-opacity group relative`}>
      {/* Icon */}
      {icon && (
  <span className="w-4 h-4 shrink-0 mt-1.5 text-slate-400 group-hover:text-sky-400 transition-colors">
    {icon}
  </span>
)}

      {/* Text Value */}
      <span
        className={`text-slate-300 wrap-anywhere group-hover:text-sky-400 flex items-center gap-2 ${accent ? "font-bold text-lg text-slate-100 leading-tight" : ""}`}>
        {value}
      </span>

      {/* Copy Status */}
      <div className="flex items-center ml-auto absolute right-0">
        {!isCopied ? (
          <svg
            className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-500 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 18.5v-2h2v2zM3 15v-2h2v2zm0-3.5v-2h2v2zM6.5 22v-2h2v2zM9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm1 6v-2h2v2zm-5 0q-.825 0-1.412-.587T3 20h2zm8.5 0v-2h2q0 .825-.587 1.413T13.5 22M3 8q0-.825.588-1.412T5 6v2zm10.5 2"
            />
          </svg>
        ) : (
          <span className="text-[10px] font-semibold text-sky-400 bg-slate-50 p-1 shadow shadow-sky-400 rounded animate-pulse">
            COPIED
          </span>
        )}
      </div>
    </div>
  );
}

// main collage card
const CollegeCard = ({ college }) => {
  
  // cpaital letter to small letter function in below
   const toTitleCase = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const { setIsDialogOpen, setCourseArr } = useContext(CourseContext);




  return (
    <div
      className="bg-[#0F1C2B] w-full min-h-70 border border-white/20 rounded-lg
                    shadow-lg p-5 pb-16 flex flex-col relative
                    hover:shadow-2xl hover:border-white/40 hover:-translate-y-1 transition-all duration-300">
      {/*1. institute name  */}
      <CopyField
        accent
        value={toTitleCase(college.institute_name)}
       
      />

      <hr className="border-white/10 my-2" />

      {/* 2. institution type */}
      <CopyField
        value={toTitleCase(college.institution_type)}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              fill="currentColor"
              d="M335.9 84.2c-9.8-5.6-21.9-5.6-31.8 0l-224 128c-12.6 7.2-18.8 22-15.1 36S81.5 272 96 272h32v208l-51.2 38.4c-8.1 6-12.8 15.5-12.8 25.6c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32c0-10.1-4.7-19.6-12.8-25.6L512 480V272h32c14.5 0 27.2-9.8 30.9-23.8s-2.5-28.8-15.1-36l-224-128zM464 272v208h-64V272zm-112 0v208h-64V272zm-112 0v208h-64V272zm80-112c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32"
            />
          </svg>
        }
      />

      {/* 3. university */}
      <CopyField
        value={toTitleCase(college.university)}
        
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.612 3.302c.243-.07.5-.07.743 0c.518.147 1.04.283 1.564.42c2.461.641 4.96 1.293 7.184 3.104l1.024.834c.415.338.623.84.623 1.34v7a.75.75 0 0 1-1.5 0v-4.943l-.163.133a12 12 0 0 1-2.398 1.513q.06.137.061.297v4.294a2.75 2.75 0 0 1-1.751 2.562l-4 1.56a2.75 2.75 0 0 1-1.998 0l-4-1.56a2.75 2.75 0 0 1-1.751-2.562V13q.001-.163.064-.304c-.83-.399-1.64-.89-2.417-1.522l-1.024-.834c-.83-.677-.83-2.003 0-2.68l1.04-.85c2.207-1.8 4.689-2.449 7.132-3.087a74 74 0 0 0 1.567-.421m9.638 5.699c0-.09-.036-.15-.07-.178l-1.024-.834C18 6.5 16.078 5.843 13.64 5.202a91 91 0 0 1-1.656-.446c-.57.161-1.124.307-1.662.449c-2.42.636-4.529 1.191-6.46 2.768l-1.041.849c-.035.028-.071.087-.071.177s.036.15.07.178l1.025.834c1.948 1.587 4.076 2.146 6.515 2.787q.805.208 1.656.446c.57-.161 1.124-.307 1.662-.449c2.42-.636 4.529-1.191 6.46-2.767l1.041-.85c.035-.028.071-.087.071-.177m-7.294 5.276c1.1-.287 2.207-.577 3.294-.972v3.989c0 .515-.316.977-.796 1.165l-4 1.559a1.25 1.25 0 0 1-.908 0l-4-1.56a1.25 1.25 0 0 1-.796-1.164v-3.998c1.099.4 2.219.692 3.33.982c.525.137 1.047.273 1.565.42c.243.07.5.07.743 0c.519-.148 1.042-.284 1.568-.421"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      {/* 4. district */}
      <CopyField
        value={toTitleCase(college.district)}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16 10V6.85zM4.35 20.7q-.5.2-.925-.112T3 19.75v-14q0-.325.188-.575T3.7 4.8L9 3l6 2.1l4.65-1.8q.5-.2.925.113T21 4.25v8.425q-.375-.575-.888-1.05T19 10.8V5.7l-3 1.15V10q-.525 0-1.025.088T14 10.35v-3.5l-4-1.4v13.075zM5 18.3l3-1.15V5.45l-3 1zm11-.3q.85 0 1.413-.5T18 16q.025-.85-.562-1.425T16 14t-1.425.575T14 16t.575 1.425T16 18m0 2q-1.65 0-2.825-1.175T12 16t1.175-2.825T16 12t2.825 1.175T20 16q0 .575-.137 1.088t-.413.962L22 20.6L20.6 22l-2.55-2.55q-.45.275-.962.413T16 20M8 5.45v11.7z"
            />
          </svg>
        }
      />

      {/* 5. address */}
      <CopyField
        value={toTitleCase(college.address)}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"
            />
          </svg>
        }
      />

      {/* 6. view course btn */}
      <button
        className="absolute right-4 bottom-4 px-4 py-2 rounded-md cursor-pointer
                   bg-sky-500/10 text-sky-400 border border-sky-500/30
                   hover:bg-sky-500 hover:text-white hover:border-sky-500
                   active:scale-95 transition-all duration-300 text-sm font-medium"
        onClick={() => {
          setIsDialogOpen(true);
          setCourseArr(college.programmes);
        }}>
        View Courses
      </button>
    </div>
  );
};

export default CollegeCard;
