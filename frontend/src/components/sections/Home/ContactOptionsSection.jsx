import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const CONTACT_OPTIONS = [
  {
    iconBg: "#d8eadc",
    iconColor: "#6db48a",
    icon: FiPhone,
    title: "Call Us Now",
    main: "01268 904 508",
    mainHref: "tel:01268904508",
    secondary: "Mon–Sat (8am – 6pm)",
  },
  {
    iconBg: "#dce7f2",
    iconColor: "#5b86b7",
    icon: FiMail,
    title: "Email Us",
    main: "Info@dailyassistuk.com",
    mainHref: "mailto:Info@dailyassistuk.com",
    secondary: "We'll respond within 24 hours",
  },
  {
    iconBg: "#f3d8d3",
    iconColor: "#e07a67",
    icon: FiMapPin,
    title: "Service Area",
    main: "Canvey Island & Benfleet",
    mainHref: null,
    secondary: "Essex, UK",
  },
];

export default function ContactOptionsSection() {
  return (
    <section className="w-full bg-[#fbfaf7] py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-2xl md:text-5xl font-semibold text-[#4a86c5] mb-6">
          Need help choosing the right option?
        </h2>

        <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-600 leading-relaxed mb-16">
          Contact us today for a friendly, no-obligation chat about how we can
          help you or your loved ones maintain independence at home.
        </p>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {CONTACT_OPTIONS.map((option, i) => {
            const Icon = option.icon;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: option.iconBg }}>
                  <Icon size={32} style={{ color: option.iconColor }} />
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-1">{option.title}</p>
                {option.mainHref ? (
                  <a href={option.mainHref} className="text-gray-700 text-sm hover:text-[#4a86c5] transition-colors duration-200">
                    {option.main}
                  </a>
                ) : (
                  <p className="text-gray-700 text-sm">{option.main}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">{option.secondary}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <a href="/contact"
            className="flex items-center gap-3 bg-[#4a86c5] text-white font-medium text-base px-8 py-4 rounded-lg shadow-lg shadow-blue-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/60 hover:-translate-y-0.5">
            <FiPhone size={20} />
            Get Your Free Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
