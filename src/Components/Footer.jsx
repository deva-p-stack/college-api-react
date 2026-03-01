export default function Footer(){







return(
<>

 <footer className="w-full bg-[#111D28] py-6 md:py-4">

    <div
      
      className="max-w-7xl mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

     {/* left side */}
      <div className="w-full md:w-auto">
        <h3 className="text-xs text-white/80">© 2026 Copyright
          <a href="https://cyberdudenetworks.com/" target="_blank"
            className="inline-block text-sky-500 hover:scale-105 active:scale-95 hover:text-sky-400 transition-all hover:px-2 duration-300 ease-in-out drop-shadow-lg [text-shadow:0_0_30px_rgba(56,189,248,0.3)]">
            CyberDude Networks Pvt. Ltd.</a>All Rights Reserved.
        </h3>
      </div>

      {/* right side content */}
      <div className="w-full md:w-auto py-1">
        <h2 className="text-xs text-white/80">Built with
          <span className="inline-block animate-pulse drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">💙</span> by the <a
            href="https://interns.cyberdudenetworks.com/" target="_blank"
            className="text-sky-500/80 hover:text-sky-400 transition pl-0.5"> CyberDude Internship Team</a>
        </h2>
      </div>

    
        </div>
  </footer>





</>


);}