export default function LandingFooter() {
  return (
    <footer className="w-full  mt-12 bg-base-300 border-t border-base-300 shadow-inner relative  text-white">
      <div className=" relative w-full h-52 bg-[#1881fa] ">
        <div id="wave1" className="wave" />
        <div id="wave2" className="wave" />
        <div id="wave3" className="wave" />
        <div id="wave4" className="wave" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between gap-6">
          <p className="text-2xl font-extrabold text-primary">Phoenix Task</p>

          <ul className="flex flex-wrap gap-4 text-base-content/70 font-medium">
            <li>
              <a href="/about" className="hover:text-primary transition">
                درباره ما
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener"
                className="hover:text-primary transition"
              >
                گیت‌هاب
              </a>
            </li>
          </ul>

          <div className="text-xs text-base-content/60 text-center md:text-right">
            © {new Date().getFullYear()} Phoenix Task. ساخته‌شده با ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}
