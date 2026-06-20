

import { useRef, useEffect } from "react";

export default function CheckInSuccessModal({ isOpen, onClose, buttonText = "Back to Homepage" }) {
  const confettiRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const el = confettiRef.current;
    if (!el) return;

    let count = 0;

    const run = () => {
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = count % 2 === 0
        ? "semi-cw 0.4s ease-out forwards"
        : "semi-ccw 0.4s ease-out forwards";
      count++;
    };

    run();
    const interval = setInterval(run, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* ── Keyframes injected directly ── */}
      <style>{`
        @keyframes semi-cw {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(180deg); }
        }
        @keyframes semi-ccw {
          0%   { transform: rotate(0deg);    }
          100% { transform: rotate(-180deg); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        onClick={onClose}
      >
        <div
          className="flex flex-col items-center gap-4 w-full max-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── White box ── */}
        <div className="bg-white rounded-3xl shadow-xl w-full px-5 py-7 sm:px-8 sm:py-10
                          flex flex-col items-center gap-4 sm:gap-6">

            {/* Celebration illustration */}
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">

              {/* Confetti — semi circle spin */}
              <div ref={confettiRef} className="absolute inset-0">
                <span className="absolute top-1  left-14 w-3 h-3 bg-[#4ecb9e] rounded-sm rotate-12"/>
                <span className="absolute top-0  left-[45%] w-3 h-3 bg-purple-600 rounded-full"/>
                <span className="absolute top-2  right-12 text-[#f5a623] text-lg">✦</span>
                <span className="absolute top-6  left-4  text-[#4ecb9e] text-xl font-bold">)</span>
                <span className="absolute top-10 left-1  text-[#f5a623] text-lg">✦</span>
                <span className="absolute top-6  right-4  text-[#4ecb9e] text-xl">|</span>
                <span className="absolute top-10 right-0  text-[#4ecb9e] text-lg font-bold">(</span>
                <span className="absolute top-[40%] left-0 w-3 h-3 bg-purple-600 rounded-full"/>
                <span className="absolute top-[52%] left-3 text-[#f5a623] text-lg">✦</span>
                <span className="absolute top-[38%] right-1 w-3 h-3 bg-[#4ecb9e] rounded-sm rotate-45"/>
                <span className="absolute top-[52%] right-2 text-[#f5a623] text-base">✦</span>
                <span className="absolute bottom-8 left-3  text-[#4ecb9e] text-xl">|</span>
                <span className="absolute bottom-4 left-8  text-[#f5a623] text-lg">✦</span>
                <span className="absolute bottom-2 left-14 w-3 h-3 bg-[#4ecb9e] rounded-sm rotate-12"/>
                <span className="absolute bottom-0 left-[45%] w-2 h-5 bg-[#4ecb9e] rounded-sm"/>
                <span className="absolute bottom-1 right-14 text-[#f5a623] text-lg">✦</span>
                <span className="absolute bottom-6 right-4">
                  <svg viewBox="0 0 20 10" className="w-6 h-3">
                    <path d="M0 10 Q10 0 20 10" fill="none" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="absolute bottom-10 right-1 w-3 h-3 bg-purple-600 rounded-full"/>
                <span className="absolute bottom-6 left-1">
                  <svg viewBox="0 0 20 10" className="w-6 h-3">
                    <path d="M0 10 Q10 0 20 10" fill="none" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
{/* Green circle with tick — stays still */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#4ecb9e] flex items-center
                              justify-center shadow-lg z-10">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2.5}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>

            {/* Success text */}
            <p className="text-[#4ecb9e] text-lg font-bold text-center">
              Check-In Successful!
            </p>

          </div>

          {/* ── Button outside white box ── */}
         <button
            onClick={onClose}
            className="w-3/4 bg-[#f5c045] hover:bg-[#e8b030] text-gray-900
                       font-semibold text-xs sm:text-sm py-3 sm:py-4 rounded-2xl
                       flex items-center justify-center gap-2
                       transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2.5}
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
            </svg>
          {buttonText}
          </button>
        </div>
      </div>
    </>
  );
}