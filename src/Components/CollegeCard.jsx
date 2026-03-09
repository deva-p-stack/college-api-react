// CopyField
function CopyField({ icon, value,accent }) {

  return (
    <p
      className="flex items-start gap-2 pt-2 text-slate-100 cursor-pointer hover:opacity-80 transition-opacity"
      title="Click to copy"
    >
      <span className="w-5 h-5 shrink-0 mt-0.5">{icon}</span>
      <span className={accent ? "font-semibold text-sky-400/80" : ""}>
        {value}
      </span>
    </p>
  );
}

const CollegeCard = ({ college}) => {
  return (
    <div className="bg-[#0F1C2B] w-full min-h-50 border border-white/20 rounded-lg
                    shadow-lg p-5 pb-13 flex flex-col relative
                    hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* 1.College name */}
      <div
        className="flex items-start gap-2 cursor-pointer"
      >
        <svg className="w-5 h-5 shrink-0 mt-0.5 text-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            <path strokeLinejoin="round" strokeWidth="1.5" d="M7 22v-9.602c0-1.068 0-1.602.245-2.05c.244-.448.693-.737 1.592-1.315l2.082-1.338c.525-.337.787-.506 1.081-.506s.556.169 1.082.506l2.081 1.338c.899.578 1.348.867 1.592 1.315c.245.448.245.982.245 2.05V22" />
            <path strokeLinejoin="round" strokeWidth="2" d="M12 13h.009" />
            <path strokeLinejoin="round" strokeWidth="1.5" d="M21 22v-5.838c0-2.291-1.26-2.477-4-3.162M3 22v-5.838C3 13.871 4.26 13.685 7 13m-5 9h20M12 22v-4" />
            <path strokeWidth="1.5" d="M12 7V4.982m0 0V2.97c0-.474 0-.711.146-.858c.46-.463 2.354.631 3.074 1.075c.608.374.78 1.122.78 1.795z" />
          </g>
        </svg>
        <h3 className="font-semibold text-lg text-slate-200 leading-snug">
          {college.institute_name}
        </h3>
      </div>

      {/* 2.Institution type*/}
      <CopyField
        accent
        value={college.institution_type}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-full h-full">
            <path fill="currentColor" d="M335.9 84.2c-9.8-5.6-21.9-5.6-31.8 0l-224 128c-12.6 7.2-18.8 22-15.1 36S81.5 272 96 272h32v208l-51.2 38.4c-8.1 6-12.8 15.5-12.8 25.6c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32c0-10.1-4.7-19.6-12.8-25.6L512 480V272h32c14.5 0 27.2-9.8 30.9-23.8s-2.5-28.8-15.1-36l-224-128zM464 272v208h-64V272zm-112 0v208h-64V272zm-112 0v208h-64V272zm80-112c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32" />
          </svg>
        }
      />

      {/* 3.University*/}
      <CopyField
        accent
        value={college.university}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
            <path fill="currentColor" fillRule="evenodd" d="M11.612 3.302c.243-.07.5-.07.743 0c.518.147 1.04.283 1.564.42c2.461.641 4.96 1.293 7.184 3.104l1.024.834c.415.338.623.84.623 1.34v7a.75.75 0 0 1-1.5 0v-4.943l-.163.133a12 12 0 0 1-2.398 1.513q.06.137.061.297v4.294a2.75 2.75 0 0 1-1.751 2.562l-4 1.56a2.75 2.75 0 0 1-1.998 0l-4-1.56a2.75 2.75 0 0 1-1.751-2.562V13q.001-.163.064-.304c-.83-.399-1.64-.89-2.417-1.522l-1.024-.834c-.83-.677-.83-2.003 0-2.68l1.04-.85c2.207-1.8 4.689-2.449 7.132-3.087a74 74 0 0 0 1.567-.421m9.638 5.699c0-.09-.036-.15-.07-.178l-1.024-.834C18 6.5 16.078 5.843 13.64 5.202a91 91 0 0 1-1.656-.446c-.57.161-1.124.307-1.662.449c-2.42.636-4.529 1.191-6.46 2.768l-1.041.849c-.035.028-.071.087-.071.177s.036.15.07.178l1.025.834c1.948 1.587 4.076 2.146 6.515 2.787q.805.208 1.656.446c.57-.161 1.124-.307 1.662-.449c2.42-.636 4.529-1.191 6.46-2.767l1.041-.85c.035-.028.071-.087.071-.177m-7.294 5.276c1.1-.287 2.207-.577 3.294-.972v3.989c0 .515-.316.977-.796 1.165l-4 1.559a1.25 1.25 0 0 1-.908 0l-4-1.56a1.25 1.25 0 0 1-.796-1.164v-3.998c1.099.4 2.219.692 3.33.982c.525.137 1.047.273 1.565.42c.243.07.5.07.743 0c.519-.148 1.042-.284 1.568-.421" clipRule="evenodd" />
          </svg>
        }
      />

      {/* 4.District */}
      <CopyField
        accent
        value={college.district}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-full h-full">
            <path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332c.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933a9 9 0 0 1-.481-1.079a8.4 8.4 0 0 0-1.198.49a7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521a8.4 8.4 0 0 0-1.197-.49a9 9 0 0 1-.481 1.078a7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667c.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49a7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
          </svg>
        }
      />

      {/* 5.Address */}
      <CopyField
        value={college.address}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5" />
          </svg>
        }
      />

      {/* 6.View Courses*/}
      <button
        className="absolute right-3 bottom-3 px-3 py-2 rounded cursor-pointer
                   bg-slate-800/80 text-sky-400/80 border border-transparent
                   hover:border-sky-400 hover:bg-gray-900/70 hover:-translate-y-0.5
                   active:scale-95 transition-all duration-300 text-sm"
      >
        View Courses
      </button>

    </div>
  );
}

export default CollegeCard;