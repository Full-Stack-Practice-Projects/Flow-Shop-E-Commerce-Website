import AboutUs from "./components/about-us/AboutUs";
import CompanyLinks from "./components/company-links/CompanyLinks";
import EmailSubscribe from "./components/email-subscribe/EmailSubscribe";
import FooterBottom from "./components/footer-bottom/FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-secondary py-10 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <AboutUs />
          <CompanyLinks />
          <EmailSubscribe />
        </div>
        <hr className="mb-10 mt-16" />
        <FooterBottom />
      </div>
    </footer>
  );
}
