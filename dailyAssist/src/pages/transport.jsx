import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
  title: "Transport to Appointments",
  description: "Accompanied transport to appointments and activities..",
  heroImage: "/Images/ServicesImage/card4.png",
  secondaryImage: "/Images/ServicesImage/Transport.png",
  aboutText:
    "We provide safe, accompanied transport to appointments and social outings, offering support before, during, and after visits where needed.",
  includedItems: [
    "GP, hospital, and clinic appointments",
    "Hairdresser / barber visits",
    "Social and community activities",
    "Support during appointments (e.g. note-taking)",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}