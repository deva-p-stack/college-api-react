const Footer = () => {
  return (
    <footer className="w-full bg-[#111D28] py-6 md:py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <h3 className="text-xs text-white/80 m-0">
          © 2026 Copyright{" "}
          <a
            href="https://cyberdudenetworks.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-500 hover:text-sky-400 hover:px-1 active:scale-95
                       transition-all duration-300 drop-shadow-lg inline-block">
            CyberDude Networks Pvt. Ltd.
          </a>{" "}
          All Rights Reserved.
        </h3>

        <h2 className="text-xs text-white/80 m-0 font-normal">
          Built with{" "}
          <span className="inline-block animate-pulse drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
            💙
          </span>{" "}
          by the{" "}
          <a
            href="https://interns.cyberdudenetworks.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-500/80 hover:text-sky-400 transition pl-0.5">
            CyberDude Internship Team
          </a>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;