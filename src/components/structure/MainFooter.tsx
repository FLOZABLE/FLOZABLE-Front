import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "Main",
    links: [
      { name: "About", href: "/#about" },
      { name: "Features", href: "/#features" },
      { name: "Reviews", href: "/#reviews" },
    ],
  },
  {
    title: "Dashboard",
    links: [
      { name: "Main", href: "/dashboard" },
      { name: "Stats", href: "/dashboard/stats" },
    ],
  },
];

const MainFooter = ({}) => {
  return (
    <section className="px-10 py-32">
      <footer>
        <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
          <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href="https://shadcnblocks.com">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={10}
                  height={10}
                  className="w-10 h-10"
                />
              </a>
              <h2 className="text-xl font-semibold">FLOZABLE</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              A collection of 100+ responsive HTML templates for your startup
              business or side project.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a target="_blank" href="https://www.instagram.com/flozable/">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a target="_blank" href="https://www.youtube.com/@FLOZABLE.">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-6 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
          <p>
            © {DateTime.now().get("year")} FLOZABLE.com. All rights reserved.
          </p>
          <ul className="flex justify-center gap-4 lg:justify-start">
            <li className="hover:text-primary">
              <Link href="/terms"> Terms and Conditions</Link>
            </li>
            <li className="hover:text-primary">
              <Link href="/privacy"> Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default MainFooter;
