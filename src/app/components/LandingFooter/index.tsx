export default function LandingFooter() {
  return (
    <footer className="w-full  mt-12 bg-base-300 border-t border-base-300 shadow-inner relative  text-white">
      <div className="wave-container relative w-full h-28 bg-[#0099ff] ">
        <div
          id="wave4"
          className="absolute inset-x-0 -top-10 bottom-0 h-28 wave-layer wave-sparse animate-wave-14-2000 opacity-30 z-[1] origin-bottom scale-y-[1.5]"
        />
        <div
          id="wave3"
          className="absolute inset-x-0 -top-10 bottom-0 h-28 wave-layer wave-std    animate-wave-12-720  opacity-45 z-[2] origin-bottom scale-y-[1.6] delay--2s"
        />
        <div
          id="wave2"
          className="absolute inset-x-0 -top-10 bottom-0 h-28 wave-layer wave-std    animate-wave-10-1440 opacity-60 z-[3] origin-bottom scale-y-[1.7] delay--4s"
        />
        <div
          id="wave1"
          className="absolute inset-x-0 -top-10 bottom-0 h-28 wave-layer wave-dense  animate-wave-8-1440  opacity-80 z-[4] origin-bottom scale-y-[1.8] delay--6s"
        />
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
