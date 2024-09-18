// Navbar.tsx
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../button/switch/DarkmodeSwitch";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext"; // Import the dark mode context

export const Navbar = () => {
  // Use authentication context
  const { isAuthenticated, logout } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  // Use dark mode context
  const { mode: darkMode } = useDarkMode(); // Get dark mode state from context

  // Links
  const baseLinks = [
    {
      title: "Home",
      sublinks: [
        { title: "Projekt Erklärung", href: "#" },
        { title: "Team Management", href: "#" },
      ],
    },
    { title: "About", sublinks: [] },
    {
      title: "Impressum",
      sublinks: [
        { title: "Impressums Page", href: "#" },
        { title: "Datenschutz", href: "#" },
      ],
    },
    {
      title: "Code",
      sublinks: [
        { title: "Github", href: "https://github.com/LudwigLEDE/LetteHub" },
        { title: "API Docs", href: "http://localhost:8080" },
      ],
    },
  ];

  if (isAuthenticated) {
    baseLinks.push({
      title: "Dashboard",
      sublinks: [
        { title: "Project Select", href: "#" },
        { title: "Team Management", href: "#" },
      ],
    });
  }

  return (
    <div
      className={`${
        darkMode === "dark"
          ? "bg-backgrounddark text-foregrounddark"
          : "bg-backgroundlight text-foregroundlight"
      }`}
    >
      <RoundedDrawerNav
        links={baseLinks}
        navBackground={
          darkMode === "dark" ? "bg-backgrounddark" : "bg-backgroundlight"
        }
        bodyBackground="bg-foregroundlight dark:bg-foregrounddark"
        isAuthenticated={isAuthenticated}
        logout={logout}
        navigate={navigate}
        darkMode={"dark"}
      />
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
  isAuthenticated,
  logout,
  navigate,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: React.ReactNode;
  links: LinkType[];
  darkMode: "dark" | "light";
  isAuthenticated: boolean;
  logout: () => void;
  navigate: (path: string) => void;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);

    return link ? link.sublinks : [];
  }, [hovered]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`p-4 ${navBackground}`}
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
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Show Login or Logout button */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-md bg-delete px-3 py-1.5 text-sm text-foregrounddark transition-colors hover:bg-primarydark"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-md bg-primary px-3 py-1.5 text-sm text-primarycontent transition-colors hover:bg-primarydark"
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileNavOpen((pv) => !pv)}
            className="mt-0.5 block text-2xl text-copy dark:text-foregrounddark md:hidden"
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
  return <img src="../../../public/Logo.svg" alt="" className="w-8" />;
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-copy dark:text-foregrounddark transition-colors hover:text-copylight dark:hover:text-primarycontent"
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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className="text-md block font-semibold text-copy dark:text-foregrounddark">
                  {l.title}
                </span>
                {l.sublinks.map((sl) => (
                  <a
                    className="text-md block text-copylight dark:text-primarycontent transition-colors hover:text-copylighter dark:hover:text-primarylight"
                    href={sl.href}
                    key={sl.title}
                  >
                    {sl.title}
                  </a>
                ))}
              </div>
            );
          })}
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
    className="cursor-pointer text-copy dark:text-foregrounddark transition-colors hover:text-copylight dark:hover:text-primarycontent"
  >
    {children}
  </span>
);

export default Navbar;
