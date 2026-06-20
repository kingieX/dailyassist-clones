import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
 title: "Home-Help",
  titleClassName: "relative text-3xl md:text-4xl font-bold text-gray-900 z-10",
  description: "Everyday household support to keep your home comfortable and manageable.",
  heroImage: "/Images/ServicesImage/card1.png",
  secondaryImage: "../Images/ServicesImage/Homehelp.png",
  aboutText:
    "Our Home-Help service provides practical assistance with daily household tasks, helping you maintain a clean, organised, and comfortable home without stress. Support is flexible and tailored to your routine.",
  includedItems: [
    "General house cleaning",
    "Laundry & ironing",
    "Bed-making",
    "Simple meal preparation",
    "Kitchen tidy-up",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}