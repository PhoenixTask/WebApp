export default function LandingFooter() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full  mt-60 bg-[#1881fa] border-t border-base-300 shadow-inner relative  text-white">
      <div className=" relative w-full h-32 bg-[#1881fa]">
        <div id="wave1" className="wave" />
        <div id="wave2" className="wave" />
        <div id="wave3" className="wave" />
        <div id="wave4" className="wave" />
      </div>
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between gap-6 text-amber-50">
          <p className="text-2xl font-extrabold">Phoenix Task</p>

          <ul className="flex flex-wrap gap-4 text-base-content/70 font-medium">
            <li>
              <a
                href="https://github.com/PhoenixTask"
                target="_blank"
                rel="noopener"
                className="hover:text-primary transition text-amber-50"
              >
                گیت‌هاب
              </a>
            </li>
          </ul>

          <div className="text-xs  text-center md:text-right text-amber-50">
            © {startYear}-{currentYear} Phoenix Task. ساخته‌شده با ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}
