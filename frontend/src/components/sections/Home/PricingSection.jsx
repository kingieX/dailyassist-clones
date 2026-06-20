import {
  Home, ShoppingCart, Car, Users, UtensilsCrossed,
  Eye, Clock, MapPin, Wrench, Phone,
} from "lucide-react";

const SERVICES = [
  { icon: Home, name: "Home-Help (cleaning, tidying, laundry)", price: "£22/hour", details: "Hourly rate" },
  { icon: ShoppingCart, name: "Errands & Shopping Support", price: "£25/hour + 45p/mile", details: "Plus mileage" },
  { icon: Car, name: "Appointment Escort/Transport", price: "£25/hour + 45p/mile", details: "Plus mileage" },
  { icon: Users, name: "Companionship Visits", price: "£20/hour", details: "Hourly rate" },
  { icon: UtensilsCrossed, name: "Light Meal Preparation", price: "£20/hour", details: "Hourly rate" },
  { icon: Eye, name: "House Check (for families)", price: "£20 per visit", details: "Quick visit" },
];

const PREMIUM_ITEMS = [
  {
    icon: Clock,
    text: <><span className="font-semibold">Bank holidays & urgent visits:</span> Pricing on enquiry</>,
  },
  {
    icon: MapPin,
    text: <><span className="font-semibold">Travel charges:</span> <span className="text-green-600 font-semibold">45p per mile</span> (Canvey Island & Benfleet)</>,
  },
  {
    icon: Wrench,
    text: <><span className="font-semibold">One-off services:</span> Deep cleaning, clearance work priced after assessment</>,
  },
];

export default function PricingSection() {
  return (
    <section className="w-full bg-[#e6edf3] py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
          Full <span className="text-gray-400">Price</span> List
        </h2>
        <p className="text-gray-500 text-center max-w-5xl mx-auto mt-3 text-base md:text-2xl">
          Transparent pricing for all our elderly and everyday support services. No hidden fees, no surprises.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-2 md:p-8 mt-10">

          <h3 className="text-xl md:text-2xl font-semibold text-blue-600 text-center mb-6">
            Elderly & Everyday Support Services – Pricing Guide
          </h3>

          {/* Header row */}
          <div className="bg-[#c6daee] rounded-lg px-4 md:px-6 py-3 grid grid-cols-3 gap-4 mb-2">
            <span className="text-sm font-semibold text-gray-700">Service</span>
            <span className="text-sm font-semibold text-gray-700 text-center">Price</span>
            <span className="text-sm font-semibold text-gray-700 text-right">Details</span>
          </div>

          {/* Service rows */}
          <div className="divide-y divide-gray-100">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
            <div key={index} className="grid grid-cols-3 gap-x-2 md:gap-4 py-5 px-2 md:px-6 items-center">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className="text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 text-xs md:text-base">{service.name}</span>
                  </div>
                  <div className="md:text-center pl-7 md:pl-0">
                    <span className="text-blue-500 font-semibold text-xs md:text-base">{service.price}</span>
                  </div>
                  <div className="md:text-right pl-7 md:pl-0">
                    <span className="text-gray-500 text-xs md:text-base">{service.details}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium rate box */}
          <div className="mt-6 bg-[#e9f7ef] border-l-4 border-green-400 rounded-lg p-5">
            <p className="font-semibold text-gray-800 mb-3">Premium Rate Information</p>
            <ul className="flex flex-col gap-2">
              {PREMIUM_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <Icon size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm md:text-base">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <a href="/contact" className="flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105">
              <Phone size={16} />
              Get Your Personal Quote
            </a>
          </div>

          <p className="text-sm text-gray-400 text-center mt-4">
            Free consultation to discuss your specific needs and pricing
          </p>

        </div>
      </div>
    </section>
  );
}