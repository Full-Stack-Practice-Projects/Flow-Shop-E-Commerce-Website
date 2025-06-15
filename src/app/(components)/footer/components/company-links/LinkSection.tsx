interface LinkItem {
  label: string;
  href: string;
}

interface LinkSectionProps {
  title: string;
  links: Array<LinkItem>;
}

export default function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>

      <ul className="mt-6 space-y-4">
        {links.map((link) => {
          return (
            <li key={link.label}>
              <a
                href={link.href}
                title=""
                className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
              >
                {" "}
                {link.label}{" "}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
