import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
  title: "Welfare Check-Ins & Companionship",
   titleClassName: "relative text-lg md:text-4xl font-bold text-gray-900 z-10",
  description: "Friendly visits focused on reassurance, connection, and well-being..",
  heroImage: "/Images/ServicesImage/card3.png",
  secondaryImage: "/Images/ServicesImage/bg2.png",
  aboutText:
    "Our welfare check-ins provide regular, friendly visits to ensure clients are safe, comfortable, and not feeling isolated. This service offers peace of mind for both clients and their families.",
  includedItems: [
    "Short friendly visits",
    "Conversation & activities",
    "Safety and wellbeing check-ins ",
    "Support and staying socially connected",
    "Reassurance updates to family members (with consent)",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}