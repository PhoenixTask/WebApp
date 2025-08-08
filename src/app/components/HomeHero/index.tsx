export default function HomeHero() {
  return (
    <section className="relative w-full py-16 px-4 bg-base-200 dark:bg-base-300 rounded-2xl mt-4 mb-8 overflow-hidden shadow-sm">
      <svg
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none select-none"
        aria-hidden="true"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="phoenix-gradient"
            x1="0"
            y1="0"
            x2="1440"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4FC3F7" />
            <stop offset="0.2" stopColor="#FF9800" />
            <stop offset="0.5" stopColor="#F06292" />
            <stop offset="0.8" stopColor="#AF19D3" />
            <stop offset="1" stopColor="#FFE082" />
          </linearGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="40" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0,300 Q360,420 720,250 T1440,280 L1440,600 L0,600Z"
          fill="url(#phoenix-gradient)"
          filter="url(#glow)"
          opacity="0.9"
        />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-base-content drop-shadow-lg">
          Phoenix Task
        </h1>
        <p className="text-base md:text-xl text-base-content/90 mb-8">
          ققنوس شو! کارهات رو با انرژی دوباره سازمان‌دهی کن و به اهدافت پرواز
          کن.
          <br />
          ابزاری سبک و الهام‌بخش برای ثبت، پیگیری و مدیریت کارها — الهام گرفته
          از ترلو، متفاوت برای تو!
        </p>
        <a
          href="/about"
          className="inline-block bg-gradient-to-r from-sky-400 via-orange-400 via-pink-400 to-purple-500 text-white px-8 py-3 rounded-full shadow-lg font-bold tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
          style={{ minWidth: 180 }}
        >
          همین الان شروع کن
        </a>
      </div>
    </section>
  );
}
