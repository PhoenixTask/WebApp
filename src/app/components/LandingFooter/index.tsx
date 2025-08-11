export default function LandingFooter() {
  return (
    <footer className="w-full mt-12 bg-base-300 border-t border-base-300 shadow-inner relative overflow-hidden text-white">
      <img
        src="/view/landingfooter_img.png"
        alt="footer"
        className="pointer-events-none absolute inset-x-0 top-0 w-full h-20 md:h-24 lg:h-28  object-top z-0"
      />
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
