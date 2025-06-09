import LinkSection from "./LinkSection";

export default function CompanyLinks() {
  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Works", href: "#" },
    { label: "Career", href: "#" },
  ];

  const helpLinks = [
    { label: "Customer Support", href: "#" },
    { label: "Delivery Details", href: "#" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "#" },
  ];

  return (
    <>
      <LinkSection title="Company" links={companyLinks} />
      <LinkSection title="Help" links={helpLinks} />
    </>
  );
}
