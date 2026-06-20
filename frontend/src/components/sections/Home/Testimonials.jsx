import { useState, useEffect  } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const TESTIMONIALS = [
  { name: "Maggie S.", location: "Canvey Island", rating: 5, message: "Daily Assist has been a godsend. Sarah comes twice a week and helps with my shopping and cleaning. She's become like family to us." },
  { name: "James & Pat", location: "Benfleet", rating: 5, message: "After my wife's operation, we needed extra help around the house. The team was professional, kind and made such a difference during our recovery." },
  { name: "Solomon R.", location: "Canvey Island", rating: 5, message: "As a busy working parent, having someone reliable to help with household tasks has been invaluable. Highly recommend Daily Assist UK." },
  { name: "Dorothy H.", location: "Benfleet", rating: 5, message: "The welfare check-ins give me and my family real peace of mind. The staff are always punctual, friendly and genuinely caring." },
  { name: "Robert T.", location: "Canvey Island", rating: 5, message: "From the first call to every visit, the service has been outstanding. I feel supported and independent in my own home." },
  { name: "Linda & Mike", location: "Benfleet", rating: 5, message: "We use Daily Assist for our elderly mother and the difference it has made to her quality of life is remarkable. Truly exceptional service." },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {[...Array(count)].map((_, i) => (
        <FaStar key={i} size={14} className="text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCards(window.innerWidth < 768 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = TESTIMONIALS.length - visibleCards;

  const prev = () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  return (
    <section className="w-full bg-[#f5f0e4] py-24 px-6">
      <div className="max-w-7xl mx-auto">

       <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent mb-6 pb-2">
  What Our Clients Say
</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto text-base mb-16">
          Don't just take our words for it - hear from the families we've helped.
        </p>

        {/* Slider */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * (100 / visibleCards)}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-shrink-0 px-4" style={{ width: `${100 / visibleCards}%` }}>
                <div className="bg-white rounded-xl shadow-md p-8 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl">
                  <p className="text-gray-500 italic leading-relaxed mb-8 text-base">"{t.message}"</p>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                    <StarRating count={t.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button onClick={prev} aria-label="Previous testimonial" className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 hover:shadow-lg">
            <FiChevronLeft size={20} className="text-gray-700" />
          </button>
          <button onClick={next} aria-label="Next testimonial" className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(250,204,21,0.9)]">
            <FiChevronRight size={20} className="text-gray-800" />
          </button>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
  <a href="/pricing" className="w-full md:w-auto text-center bg-gradient-to-r from-yellow-400 to-blue-500 text-black font-semibold px-12 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
    Browse packages
  </a>
</div>

      </div>
    </section>
  );
}
