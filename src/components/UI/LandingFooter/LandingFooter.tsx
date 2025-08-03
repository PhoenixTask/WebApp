export default function LandingFooter() {
  return (
    <footer className="w-full mt-12 bg-base-200 dark:bg-base-300 border-t border-base-300 dark:border-base-100 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-primary">
            <svg
              width="32"
              height="32"
              fill="none"
              className="inline-block align-middle"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 3L20.09 12.26L30 13.27L22 20.14L24.18 30L16 24.77L7.82 30L10 20.14L2 13.27L11.91 12.26L16 3Z"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
            Phoenix Task
          </span>
        </div>

        <ul className="flex flex-wrap gap-4 text-base-content/70 font-medium">
          <li>
            <a href="/about" className="hover:text-primary transition">
              درباره ما
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-primary transition">
              تماس با ما
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
    </footer>
  );
}
