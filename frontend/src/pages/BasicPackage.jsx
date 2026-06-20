import PackageDetailTemplate from "../components/sections/PackageDetailTemplate";

const data = {
  pageTitle: "Standard Package",
  subtext:
    "Our hourly support option is ideal for one-off help or occasional assistance. You can choose the services you need and only pay for the time used..",
  packageTitle: "Standard Package",
  price: "£20 - £25",
  priceLabel: "per hour",
  priceNote: '"Flexible hourly support when you need it"',
  features: [
    "Works weekend and daytime",
    "Perfect as one-off visits",
    "All services available",
  ],
  backLink: "/pricing",
  backLabel: "Back to Packages",
  otherPackages: [
    { title: "Home Help Package", price: "£60 per week", href: "/pricing/standard" },
    { title: "Welfare Check-In Package", price: "£75 per week", href: "/pricing/premium" },
  ],
};

export default function BasicPackage() {
  return <PackageDetailTemplate {...data} />;
}