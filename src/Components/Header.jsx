export default function Header(){

return(
<>
  <header className="sticky top-0 z-30 bg-[#0D1B2A] border border-b-white/5  py-0.5">
    <input type="checkbox" id="Toggle" className="hidden peer" aria-label="search" />
    <nav className="flex items-center justify-between p-3 text-dark-200  bg-[rgba(33,34,32,0.2)]">
      
      {/* logo */}
      <div className="font-bold cursor-pointer uppercase sm:ml-34 text">

        <a href="https://cyberdudenetworks.com/"target="_blank">
        <img src="./cdn-white.svg" className="w-22 h-8" alt="company_log0" ></img>
        </a>

      </div>

     {/* nav link and nav items */}
      <ul className =" gap-6 mr-5 lg:mr-20 md:flex text-md flex justify-center items-center">
        <li className ="flex justify-center items-center">
          <a href="https://indian-colleges-list.vercel.app/" target="_blank"
            className ="hover:bg-[#dee2eb] px-4 py-2 rounded-lg cursor-pointer  bg-gray-100 text-blue-500 font-medium text-xs active:scale-95 transition-all duration-300 ease-in-out ">
            How It Works</a>
        </li>

        <li className ="flex justify-center items-center">
               <a className ="p-1 " href="https://github.com/deva-p-stack/college-api-react" target="_blank" >

          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white/80  active:scale-95 hover:scale-105 " viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
          </a>
        </li>

     
      </ul>
    </nav>
  </header>


</>
);


}