import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
  title: "Light Gardening & Practical Tasks",
  description: "Help with small outdoor and household tasks...",
  heroImage: "/Images/ServicesImage/Household.png",
  secondaryImage: "/Images/ServicesImage/card5.jpeg",
  aboutText:
    "This service supports basic outdoor maintenance and practical household tasks, helping to keep your home safe, tidy, and comfortable.",
  includedItems: [
    "Basic garden sweeping & weeding ",
    "Tidying small outdoor areas",
    "Putting bins out where safe",
    "Changing lightbulbs",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}