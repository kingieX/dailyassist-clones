export default function LetsTalkSection() {
  return (
    <section className="md:hidden relative w-full min-h-[650px] flex items-center justify-center overflow-hidden -mt-[80px]">

      {/* Background image placeholder — replace the bg-gray-700 with your actual image */}
      <div
        className="absolute inset-0  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/talk.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">

        {/* Heading */}
        <h2 className="text-5xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
 
  <span className="bg-gradient-to-r from-[#fae2a9] to-[#fae2a9] bg-clip-text text-transparent">
    Contact Us
  </span>
</h2>

       

     
      </div>
    </section>
  );
}