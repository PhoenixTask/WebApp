// components/ProjectGallery.js
import imgListShow from "@/assets/images/img_listShow.png";
import calendar from "@/assets/images/calendar.png";
import imgCalumns from "@/assets/images/img_calumns.png";

export default function ProjectGallery() {
  const galleryData = [
    {
      image: imgListShow,
      title: "نمایش لیستی تسک‌ها",
      desc: "ستون‌ها رو به صورت لیستی می‌بینی و وقتی بازش کنی می‌تونی تسک‌ها رو با جزئیاتی مثل تاریخ کامل ببینی.",
    },
    {
      image: calendar,
      title: "نمایش تقویم",
      desc: "تسک‌ها و برنامه‌ها رو در نمای تقویم ببین و برنامه‌ریزی بهتری داشته باش.",
    },
    {
      image: imgCalumns,
      title: "نمایش ستونی تسک‌ها",
      desc: "ستون‌بندی حرفه‌ای برای مدیریت بهتر تسک‌ها؛ امکان جابجایی ساده بین ستون‌ها (دراگ و دراپ).",
    },
  ];

  return (
    <section className="w-full mx-auto px-4 py-8 grid gap-8 md:grid-cols-3">
      {galleryData.map((item, idx) => (
        <div
          key={idx}
          className="bg-base-200 rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col items-center transition-all duration-300"
        >
          <div className="w-full h-64 sm:h-72 overflow-hidden">
            <img
              src={item.image.src}
              alt={item.title}
              className="w-full h-full object-cover hover:brightness-90 transition"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-bold text-lg mb-2 text-base-content">
              {item.title}
            </h3>
            <p className="text-base-content/70 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
