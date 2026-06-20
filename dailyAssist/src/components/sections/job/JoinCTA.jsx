const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75A2.75 2.75 0 015.75 3h.944a1 1 0 01.976.786l.72 3.597a1 1 0 01-.554 1.084l-1.2.514a13.07 13.07 0 006.383 6.383l.514-1.2a1 1 0 011.084-.554l3.597.72A1 1 0 0119 15.306v.944A2.75 2.75 0 0116.25 19C9.622 19 3 12.378 3 5.75z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
  </svg>
);

const JoinCTA = () => {
  return (
    <section className="relative bg-[#fafafa] py-28 px-6 overflow-hidden">

      {/* ── DECORATIVE RECTANGLES ── */}

      {/* Left Middle */}
      <div
        className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-40 md:w-64 h-48 md:h-64 rounded-2xl opacity-90 z-0 rotate-[-35deg]"
        style={{ backgroundColor: "#F5F0D8" }}
      />

      {/* Top Right */}
      <div
        className="absolute top-[-60px] right-[-40px] w-40 md:w-64 h-48 md:h-64 rounded-2xl opacity-90 z-0 rotate-[35deg]"
        style={{ backgroundColor: "#D8EFE4" }}
      />

      {/* Bottom Right */}
      <div
        className="absolute bottom-[-60px] right-[-20px] w-40 md:w-64 h-48 md:h-64 rounded-2xl opacity-90 z-0 rotate-[25deg]"
        style={{ backgroundColor: "#D6E4F0" }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-6">
          Interested in Joining Us?
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 text-xl font-semibold leading-relaxed mb-10">
          We'd love to hear from you.<br />
          Apply online or get in touch with our friendly team for an informal chat.
        </p>

        {/* Apply Now Button */}
         <a href="/contact"
         className="bg-blue-500 text-white px-16 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 cursor-pointer">
          Apply Now
       
        </a>

        {/* OR Divider */}
        <p className="text-black-500 font-medium my-8 tracking-widest text-lg">OR</p>

        {/* Contact Options */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">

          {/* Call Us */}
          <div className="flex flex-col items-center text-center">
            <a href="tel:01268904508" className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
  <PhoneIcon />
</a>
            <p className="font-bold text-2xl text-black-100 mb-1">Call Us Now</p>
          
             <a
                    href="tel:01268904508"
                   className="text-black-500 text-lg">
                  
                    01268 904 508
                  </a>
          </div>

          {/* Email Us */}
          <div className="flex flex-col items-center text-center">
            <a href="mailto:Info@dailyassistuk.com" className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">
  <MailIcon />
</a>
            <p className="font-bold text-2xl text-black-100 mb-1">Email Us</p>

            <a
                    href="mailto:Info@dailyassistuk.com"
                   className="text-black-300 text-lg"
                  >
                    Info@dailyassistuk.com
                  </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinCTA;