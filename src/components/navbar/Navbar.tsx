import {
  Dispatch,
  lazy,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../button/switch/DarkmodeSwitch";
import Homepage from "../../pages/Homepage";

const Impressum = lazy(() => import("../../pages/Impressum"));

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-backgrounddark text-foregrounddark"
          : "bg-backgroundlight text-foregroundlight"
      }`}
    >
      <RoundedDrawerNav
        links={[
          {
            title: "Home",
            sublinks: [
              { title: "Issues", href: "#" },
              { title: "Kanban", href: "#" },
              { title: "Gantt", href: "#" },
              { title: "Mind Maps", href: "#" },
            ],
          },
          {
            title: "About",
            sublinks: [
              { title: "Product Management", href: "#" },
              { title: "Marketing", href: "#" },
              { title: "IT", href: "#" },
            ],
          },
          {
            title: "Impressum",
            sublinks: [
              { title: "Impressums Page", href: "#" },
              { title: "University", href: "#" },
            ],
          },
          {
            title: "Code",
            sublinks: [
              { title: "API Docs", href: "#" },
              { title: "Socials", href: "#" },
              { title: "Blog", href: "#" },
            ],
          },
        ]}
        navBackground={
          darkMode
            ? "bg-backgrounddark text-foregrounddark"
            : "bg-backgroundlight text-foregroundlight"
        }
        bodyBackground={
          darkMode
            ? "bg-backgrounddark text-foregrounddark"
            : "bg-backgroundlight text-foregroundlight"
        }
      >
        <div className="flex flex-col items-center justify-center px-12 py-32">
          <p className="text-center">Your hero section content goes here :)</p>
          <button
            onClick={toggleDarkMode}
            className="mt-4 rounded-md bg-primarylight px-3 py-1.5 text-sm text-white transition-colors hover:bg-primarydark"
          >
            Toggle Dark Mode
          </button>
        </div>
      </RoundedDrawerNav>
    </div>
  );
};

type LinkType = {
  title: string;
  sublinks: { title: string; href: string }[];
};

const RoundedDrawerNav = ({
  children,
  navBackground,
  bodyBackground,
  links,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: ReactNode;
  links: LinkType[];
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);
    return link ? link.sublinks : [];
  }, [hovered]);

  const [mode, setMode] = useState<"dark" | "light">("dark");

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`${navBackground} p-4`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>
          <div className="flex">
            <div className="flex">
              <DarkModeToggle mode={mode} setMode={setMode} />
            </div>
            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-md bg-indigo-500 px-3 py-1.5 text-sm text-foregroundlight dark:text-foregrounddark transition-colors hover:bg-indigo-600 md:block"
            >
              <span className="font-bold">Login</span>
            </button>
          </div>
          <button
            onClick={() => setMobileNavOpen((pv) => !pv)}
            className="mt-0.5 block text-2xl text-foregroundlight dark:text-foregrounddark md:hidden"
          >
            <FiMenu />
          </button>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={`${navBackground} px-2 pb-2`}>
        <div className={`${bodyBackground} rounded-3xl`}>{children}</div>
      </motion.main>
    </>
  );
};

const Logo = () => {
  return (
    <svg
      id="Ebene_2"
      data-name="Ebene 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 94.95 94.95"
      // You can replace this with an <img> tag if you have an image logo
    />
  );
};

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks,
}: {
  links: LinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: LinkType["sublinks"];
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <TopLink key={l.title} setHovered={setHovered} title={l.title}>
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-foregroundlight dark:text-foregrounddark transition-colors hover:text-neutral-400"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({ links, open }: { links: LinkType[]; open: boolean }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => (
            <div key={l.title} className="space-y-1.5">
              <span className="text-md block font-semibold text-neutral-50 dark:text-foregrounddark">
                {l.title}
              </span>
              {l.sublinks.map((sl) => (
                <a
                  className="text-md block text-neutral-300 dark:text-foregrounddark"
                  href={sl.href}
                  key={sl.title}
                >
                  {sl.title}
                </a>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({
  children,
  setHovered,
  title,
}: {
  children: string;
  setHovered: Dispatch<SetStateAction<null | string>>;
  title: string;
}) => (
  <span
    onMouseEnter={() => setHovered(title)}
    className="cursor-pointer text-foregroundlight dark:text-foregrounddark transition-colors hover:text-secondarycontent"
  >
    {children}
  </span>
);

export default Navbar;
