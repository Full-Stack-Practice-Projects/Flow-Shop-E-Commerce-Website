import {
  Facebook,
  GitHub,
  Instagram,
  Twitter,
} from "./components/social-icons/index";

export default function SocialLinks() {
  const socialLinks = [
    {
      label: "Twitter",
      href: "#",
      component: <Twitter />,
    },
    {
      label: "Facebook",
      href: "#",
      component: <Facebook />,
    },
    {
      label: "Instagram",
      href: "#",
      component: <Instagram />,
    },
    {
      label: "GitHub",
      href: "#",
      component: <GitHub />,
    },
  ];

  return (
    <ul className="mt-9 flex items-center space-x-3">
      {socialLinks.map((socialLink) => {
        return (
          <li key={socialLink.label}>
            <a
              href={socialLink.href}
              className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-primary focus:bg-primary"
              aria-label={socialLink.label}
            >
              {socialLink.component}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
