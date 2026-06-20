import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
  title: "Errands & Shopping",
  description: "Reliable help with everyday errands and local task.",
  heroImage: "/Images/ServicesImage/card2.png",
  secondaryImage: "/Images/ServicesImage/Errands.png",
  aboutText:
    "We assist with day-to-day errands, saving you time and energy while ensuring essential tasks are taken care of safely and reliably..",
  includedItems: [
    "Collecting prescriptions",
    "picking up groceries",
    "Posting parcels and letters",
    "Other agreed local errands",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}