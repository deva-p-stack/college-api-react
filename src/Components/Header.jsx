const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-[#0D1B2A] border-b border-white/5 py-0.5">
      <nav className="flex items-center justify-between px-4 py-3 bg-[rgba(33,34,32,0.2)]">

        {/* Logo */}
        <div className="font-bold uppercase sm:ml-8">
          <img src="./cdn-white.svg" className="w-22 h-8" alt="CyberDude logo" />
        </div>

        {/* Links */}
        <ul className="flex items-center gap-6 mr-5 lg:mr-20 list-none m-0 p-0">
          <li>
            <a
              href="https://indian-colleges-list.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-gray-100 text-blue-500 font-semibold text-xs
                         hover:bg-gray-200 active:scale-95 transition-all duration-300"
            >
              How It Works
            </a>
          </li>
          <li>
            <a
              href="https://github.com/deva-p-stack/college-api"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-white/80 hover:scale-105 active:scale-95 transition-transform duration-200 block leading-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
              </svg>
            </a>
          </li>
        </ul>

      </nav>
    </header>
  );
}

export default Header