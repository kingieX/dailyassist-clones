import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";

const data = {
  title: "Community Access Support",
  description: "Making community participation easier, safer, and more enjoyable..",
  heroImage: "/Images/ServicesImage/card6.png",
  secondaryImage: "/Images/ServicesImage/bg1.png",
  aboutText:
    "This service is designed to reduce isolation, build confidence, and encourage independence through everyday social and recreational activities..",
  includedItems: [
    "Accompanying to social groups",
    "Walks",
    "Coffee outings",
  ],
};

export default function HomeHelp() {
  return <ServiceDetailTemplate {...data} />;
}